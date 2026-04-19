'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Search, Loader2, AlertCircle, Sparkles } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type AgentEvent =
  | { type: 'stream.ready' }
  | { type: 'stream.error'; message: string }
  | { type: 'agent.message'; content: Array<{ type: string; text: string }> }
  | { type: 'agent.tool_use'; name: string }
  | { type: 'agent.tool_result' }
  | { type: 'session.status_idle'; stop_reason?: { type: string } }
  | { type: 'session.status_terminated' }
  | { type: 'session.error'; error?: string }

interface Message {
  id: string
  role: 'user' | 'agent'
  text: string
  tools?: string[]
}

const TOOL_LABELS: Record<string, string> = {
  web_search: 'Suche im Web',
  web_fetch: 'Seite abrufen',
  bash: 'Befehl ausführen',
  read: 'Datei lesen',
  write: 'Datei schreiben',
}

const SUGGESTED_QUESTIONS = [
  'Was verdient ein Software-Entwickler in München?',
  'Wie hoch ist das Durchschnittsgehalt für Marketing-Manager?',
  'Was sind typische Gehälter im Bereich Data Science?',
  'Wie verhandelt man eine Gehaltserhöhung?',
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalaryAgent() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [activeTools, setActiveTools] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'initializing' | 'idle' | 'thinking' | 'error'>('initializing')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const esRef = useRef<EventSource | null>(null)
  const streamingRef = useRef('')
  const toolsRef = useRef<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // ── Session init ────────────────────────────────────────────────────────────

  useEffect(() => {
    initSession()
    return () => esRef.current?.close()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  async function initSession() {
    try {
      const res = await fetch('/api/agent/session', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSessionId(data.sessionId)
      setStatus('idle')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Verbindung fehlgeschlagen')
      setStatus('error')
    }
  }

  // ── Send message ────────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (text: string) => {
      if (!sessionId || !text.trim() || status === 'thinking' || status === 'initializing') return

      const userText = text.trim()
      setInput('')
      setStatus('thinking')
      streamingRef.current = ''
      toolsRef.current = []
      setStreamingText('')
      setActiveTools([])

      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: 'user', text: userText },
      ])

      // ① Open stream FIRST
      openStream(sessionId, userText)
    },
    [sessionId, status]
  )

  function openStream(sid: string, userText: string) {
    esRef.current?.close()

    const es = new EventSource(`/api/agent/stream/${sid}`)
    esRef.current = es

    es.onmessage = async (e) => {
      const event: AgentEvent = JSON.parse(e.data)

      if (event.type === 'stream.ready') {
        // ② Stream is open → now safe to send the message
        await fetch(`/api/agent/send/${sid}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userText }),
        })
        return
      }

      if (event.type === 'agent.message') {
        const chunk = event.content
          .filter((b) => b.type === 'text')
          .map((b) => b.text)
          .join('')
        streamingRef.current += chunk
        setStreamingText(streamingRef.current)
        return
      }

      if (event.type === 'agent.tool_use') {
        toolsRef.current.push(event.name)
        setActiveTools([...toolsRef.current])
        return
      }

      if (event.type === 'session.status_idle') {
        finalizeResponse()
        es.close()
        return
      }

      if (event.type === 'session.status_terminated') {
        finalizeResponse()
        es.close()
        setStatus('error')
        setErrorMsg('Session wurde beendet.')
        return
      }

      if (event.type === 'stream.error' || event.type === 'session.error') {
        finalizeResponse()
        es.close()
        setStatus('error')
        setErrorMsg((event as { message?: string; error?: string }).message ?? 'Ein Fehler ist aufgetreten.')
        return
      }
    }

    es.onerror = () => {
      finalizeResponse()
      es.close()
      if (streamingRef.current === '') {
        setStatus('error')
        setErrorMsg('Verbindung zum Agenten unterbrochen.')
      }
    }
  }

  function finalizeResponse() {
    if (streamingRef.current) {
      setMessages((prev) => [
        ...prev,
        {
          id: `agent-${Date.now()}`,
          role: 'agent',
          text: streamingRef.current,
          tools: toolsRef.current.length > 0 ? [...toolsRef.current] : undefined,
        },
      ])
    }
    streamingRef.current = ''
    toolsRef.current = []
    setStreamingText('')
    setActiveTools([])
    setStatus('idle')
  }

  // ── Keyboard handler ────────────────────────────────────────────────────────

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  const isDisabled = status === 'thinking' || status === 'initializing' || status === 'error'

  return (
    <div className="flex flex-col h-full min-h-[600px] bg-dark-card rounded-2xl border border-dark-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-border bg-dark-bg">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center">
            <Sparkles size={16} className="text-neon" />
          </div>
          {status === 'thinking' && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon animate-pulse" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-light">Gehalts-Agent</p>
          <p className="text-xs text-text-muted">
            {status === 'initializing' && 'Verbinde…'}
            {status === 'idle' && 'Bereit'}
            {status === 'thinking' && 'Recherchiert…'}
            {status === 'error' && 'Fehler'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Initializing */}
        {status === 'initializing' && messages.length === 0 && (
          <div className="flex items-center justify-center gap-2 py-12 text-text-muted">
            <Loader2 size={18} className="animate-spin text-neon" />
            <span className="text-sm">Agent wird initialisiert…</span>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-300">Fehler</p>
              <p className="text-xs text-red-400 mt-0.5">{errorMsg}</p>
              {!sessionId && (
                <p className="text-xs text-red-400 mt-1">
                  Bitte stelle sicher, dass <code className="bg-red-500/20 px-1 rounded">AGENT_ID</code> und{' '}
                  <code className="bg-red-500/20 px-1 rounded">ENVIRONMENT_ID</code> in der .env.local gesetzt sind.
                  Setup: <code className="bg-red-500/20 px-1 rounded">npx tsx scripts/setup-agent.ts</code>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Welcome / suggested questions */}
        {status === 'idle' && messages.length === 0 && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="text-text-light font-semibold">Willkommen beim Gehalts-Agenten</p>
              <p className="text-xs text-text-muted mt-1">
                Stelle eine Frage zu Gehältern in Deutschland
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm text-text-muted hover:text-text-light bg-dark-bg hover:bg-dark-border border border-dark-border hover:border-neon/30 rounded-xl px-4 py-3 transition-all duration-150"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {/* Streaming agent response */}
        {(status === 'thinking' || streamingText) && (
          <div className="flex flex-col gap-2">
            {/* Active tools indicator */}
            {activeTools.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {activeTools.map((tool, i) => (
                  <span
                    key={`${tool}-${i}`}
                    className="inline-flex items-center gap-1.5 text-xs bg-neon/10 border border-neon/20 text-neon/80 px-2.5 py-1 rounded-full"
                  >
                    <Search size={10} />
                    {TOOL_LABELS[tool] ?? tool}
                  </span>
                ))}
              </div>
            )}

            {/* Thinking pulse */}
            {status === 'thinking' && !streamingText && (
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Loader2 size={14} className="animate-spin text-neon" />
                <span>Recherchiert…</span>
              </div>
            )}

            {/* Streaming text */}
            {streamingText && (
              <div className="bg-dark-bg border border-dark-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-text-light whitespace-pre-wrap leading-relaxed max-w-[90%]">
                {streamingText}
                <span className="inline-block w-0.5 h-4 bg-neon ml-0.5 animate-pulse align-middle" />
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-dark-border bg-dark-bg">
        <div className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={isDisabled ? '' : 'Frage zu Gehältern stellen…'}
            disabled={isDisabled}
            rows={1}
            style={{ resize: 'none' }}
            className="flex-1 bg-dark-card border border-dark-border focus:border-neon/50 rounded-xl px-4 py-3 text-sm text-text-light placeholder:text-text-muted outline-none transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isDisabled || !input.trim()}
            className="shrink-0 w-11 h-11 rounded-xl bg-neon hover:bg-neon-dim disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150"
            aria-label="Nachricht senden"
          >
            {status === 'thinking' ? (
              <Loader2 size={16} className="animate-spin text-text-dark" />
            ) : (
              <Send size={16} className="text-text-dark" />
            )}
          </button>
        </div>
        <p className="text-xs text-text-muted mt-2 pl-1">
          Enter zum Senden · Shift+Enter für Zeilenumbruch
        </p>
      </div>
    </div>
  )
}

// ─── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-neon/15 border border-neon/25 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-text-light max-w-[80%] whitespace-pre-wrap leading-relaxed">
          {msg.text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5 max-w-[92%]">
      {msg.tools && msg.tools.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {msg.tools.map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="inline-flex items-center gap-1 text-xs text-text-muted bg-dark-bg border border-dark-border px-2 py-0.5 rounded-full"
            >
              <Search size={9} />
              {TOOL_LABELS[tool] ?? tool}
            </span>
          ))}
        </div>
      )}
      <div className="bg-dark-bg border border-dark-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-text-light whitespace-pre-wrap leading-relaxed">
        {msg.text}
      </div>
    </div>
  )
}
