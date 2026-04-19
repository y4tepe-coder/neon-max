import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      const send = (payload: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
      }

      try {
        // Open the Anthropic SSE stream (stream() returns APIPromise<Stream>, must await)
        const agentStream = await client.beta.sessions.events.stream(sessionId)

        // Signal to the client that the stream is ready — send BEFORE iterating
        // so the client knows it's safe to send the user message now.
        send({ type: 'stream.ready' })

        for await (const event of agentStream) {
          send(event)

          // Close after session terminates
          if ((event as { type: string }).type === 'session.status_terminated') {
            controller.close()
            return
          }

          // Close after a non-blocking idle (normal turn completion)
          if ((event as { type: string; stop_reason?: { type: string } }).type === 'session.status_idle') {
            const stopReason = (event as { stop_reason?: { type: string } }).stop_reason
            if (stopReason?.type !== 'requires_action') {
              controller.close()
              return
            }
            // requires_action: stay open, client must send tool result
          }
        }

        controller.close()
      } catch (err) {
        send({ type: 'stream.error', message: err instanceof Error ? err.message : String(err) })
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
