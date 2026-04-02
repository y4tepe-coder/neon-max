import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, Clock, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | NEON Agentur Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['NEON Agentur'],
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const categoryColors: Record<string, string> = {
  Ratgeber: 'bg-blue-50 text-blue-600',
  Vergleich: 'bg-purple-50 text-purple-600',
  Grundlagen: 'bg-orange-50 text-orange-600',
  SEO: 'bg-green-50 text-green-700',
}

const articleContent: Record<string, React.ReactNode> = {
  'was-kostet-eine-website': (
    <>
      <p>
        Eine der häufigsten Fragen, die wir bei NEON Agentur gestellt bekommen, lautet: „Was kostet eigentlich eine Website?" Die ehrliche Antwort ist: Es kommt darauf an – aber nicht auf Haarspaltereien, sondern auf ganz konkrete Faktoren. In diesem Artikel zeigen wir Ihnen, womit Sie wirklich rechnen müssen.
      </p>

      <h2>Die vier wichtigsten Preiskategorien</h2>
      <p>
        Website-Kosten lassen sich grob in vier Kategorien einteilen. Jede hat ihre Berechtigung – die Frage ist nur, was zu Ihrem Unternehmen und Ihren Zielen passt.
      </p>

      <h2>1. Baukastensysteme: 0 – 30 € pro Monat</h2>
      <p>
        Anbieter wie Wix, Squarespace oder Jimdo ermöglichen es, in wenigen Stunden eine Website online zu stellen. Das klingt verlockend – aber die Kehrseite ist real: Sie arbeiten mit Templates, die tausende andere Unternehmen ebenfalls nutzen. Die Seiten laden oft langsam, sind in der SEO-Tiefe begrenzt und vermitteln selten das Vertrauen, das ein professioneller Auftritt braucht. Für einen Nebenjob oder ein Hobby-Projekt mag das reichen. Für ein Unternehmen, das Kunden gewinnen will, meistens nicht.
      </p>

      <h2>2. WordPress mit Theme: 500 – 2.000 € einmalig</h2>
      <p>
        Viele Freelancer und günstige Agenturen setzen auf fertige WordPress-Themes, die sie anpassen. Das Ergebnis ist oft besser als ein reiner Baukasten – aber auch hier gilt: ein Theme ist ein Theme. Die Ladezeiten können durch schlecht optimierte Plugins leiden, die Wartung erfordert regelmäßiges Handeln, und die visuelle Eigenständigkeit bleibt begrenzt. Hinzu kommen laufende Kosten für Hosting (5–20 € / Monat) und Sicherheitsupdates.
      </p>

      <h2>3. Professionelle Agentur: 1.500 – 8.000 € einmalig</h2>
      <p>
        Größere Agenturen mit breitem Team entwickeln individuelle Websites, die auf die Marke zugeschnitten sind. Hier zahlen Sie für Konzeption, Design, Entwicklung und Projektmanagement. Das Ergebnis ist hochwertig – aber der Preis schreckt viele lokale Unternehmen ab. Und die laufenden Betreuungskosten werden oft separat und teuer berechnet.
      </p>

      <h2>4. NEON Agentur: 399 € einmalig + 79 € / Monat</h2>
      <p>
        Wir haben ein Modell entwickelt, das die Qualität einer professionellen Agentur mit der Planbarkeit kleiner Betriebe kombiniert. Einmalig 399 € für die individuelle Erstellung Ihrer Website – kein Template, kein Copy-Paste. Dazu 79 € pro Monat für Hosting, Betreuung, Sicherheit und eine monatliche Änderung inklusive. Keine versteckten Kosten, keine Mindestlaufzeit.
      </p>

      <h2>Was treibt die Kosten wirklich?</h2>
      <p>
        Neben dem Grundpreis spielen folgende Faktoren eine Rolle: Anzahl der Unterseiten, ob ein Online-Shop benötigt wird, die Komplexität von Animationen und Interaktionen, benötigte Mehrsprachigkeit sowie individuelle Funktionen wie Buchungssysteme oder Mitgliederbereiche. Für die meisten lokalen Unternehmen – Handwerksbetriebe, Dienstleister, Praxen, Restaurants – reicht eine klar strukturierte Website mit 4–7 Seiten vollkommen aus.
      </p>

      <h2>Welche laufenden Kosten entstehen noch?</h2>
      <p>
        Unabhängig vom Anbieter fallen immer Kosten für Domain (ca. 15–20 € / Jahr) und Hosting an. Bei uns ist Hosting in der monatlichen Rate enthalten. Was viele vergessen: Eine Website braucht regelmäßige Pflege – Sicherheitsupdates, Inhaltsaktualisierungen, Anpassungen an neue Anforderungen. Ohne diesen laufenden Aufwand veraltet eine Website schnell.
      </p>

      <h2>Fazit: Preis ist nicht gleich Wert</h2>
      <p>
        Eine günstige Website kann teuer werden, wenn sie keine Kunden bringt. Eine teure Website ist nur dann ihr Geld wert, wenn sie wirklich auf Ihre Zielgruppe ausgerichtet ist. Wichtiger als der absolute Preis ist die Frage: Bringt mir diese Website messbar mehr Kunden? Wir bei NEON Agentur sind davon überzeugt, dass ein professioneller Auftritt für lokale Unternehmen erschwinglich sein muss – und das ist das Fundament unseres Angebots.
      </p>
    </>
  ),

  'website-selber-machen-oder-agentur': (
    <>
      <p>
        Wix, Squarespace, Jimdo – überall Werbung für „Mach deine eigene Website in 30 Minuten". Kein Wunder, dass viele Unternehmer zunächst selbst Hand anlegen. Aber wann ist das sinnvoll, und wann kostet der DIY-Ansatz am Ende mehr als er spart? Wir beantworten das ehrlich.
      </p>

      <h2>Wann eine selbst gemachte Website ausreicht</h2>
      <p>
        Es gibt Situationen, in denen ein Baukasten wirklich genug ist: Sie testen eine Geschäftsidee, bevor Sie investieren. Sie betreiben ein Hobby-Projekt ohne kommerzielle Absicht. Oder Sie brauchen schlicht eine digitale Visitenkarte, die Ihre Adresse und Telefonnummer zeigt. In diesen Fällen ist ein selbst erstellter Auftritt absolut legitim – er ist schnell, kostet wenig und erfüllt seinen Zweck.
      </p>

      <h2>Warum Baukästen für echte Unternehmen oft scheitern</h2>
      <p>
        Das Problem beginnt, wenn Ihre Website mehr leisten soll als eine Visitenkarte. Kunden sollen Vertrauen fassen, Ihre Leistungen verstehen und Sie kontaktieren. Dafür braucht es ein durchdachtes Design, klare Strukturen und eine Sprache, die Ihre Zielgruppe anspricht.
      </p>
      <p>
        Baukästen liefern Templates – und Templates sehen für den Laien gut aus, aber erfahrene Kunden erkennen sie sofort. Was noch schwerer wiegt: Die meisten selbst erstellten Websites sind schlecht für Google optimiert. Kein lokales SEO, keine saubere technische Struktur, keine Schema-Daten. Die Website existiert zwar – aber niemand findet sie.
      </p>

      <h2>Der unsichtbare Zeitaufwand</h2>
      <p>
        „Das mach ich mal schnell selbst" – diesen Satz hören wir oft. Und dann kommt die Realität: Die Auswahl des richtigen Templates dauert Stunden. Texte schreiben, Fotos bearbeiten, Farben abstimmen, das Kontaktformular einrichten, die mobile Ansicht reparieren. Was als 2-Stunden-Projekt beginnt, wird oft zu tagelanger Arbeit – Zeit, die Sie in Ihr eigentliches Geschäft hätten investieren können.
      </p>

      <h2>Was eine Agentur wirklich anders macht</h2>
      <p>
        Eine professionelle Agentur bringt nicht nur Design-Kompetenz mit – sie kennt die Psychologie hinter Conversion-optimierten Seiten. Welche Texte überzeugen? Wo muss der Call-to-Action sitzen? Wie viel Information ist zu viel? Diese Fragen sind das Ergebnis von Erfahrung mit Dutzenden von Projekten, nicht von Tutorial-Videos.
      </p>
      <p>
        Außerdem kümmert sich eine Agentur um die technische Basis: schnelle Ladezeiten, SSL-Zertifikat, strukturierte Daten für Google, sauberer Code ohne aufgeblähte Plugins. Das sind Dinge, die im Hintergrund passieren – aber entscheidend dafür sind, ob Google Ihre Seite als vertrauenswürdig einstuft.
      </p>

      <h2>Die Kostenfrage: Selbst machen ist nicht kostenlos</h2>
      <p>
        Viele rechnen: Baukasten = 20 € / Monat. Agentur = 79 € / Monat. Das macht 59 € Unterschied. Was die meisten dabei vergessen: Ihre Zeit hat einen Wert. Wenn Sie als Unternehmer 3 Stunden pro Woche mit Ihrer Website verbringen statt mit Ihrem Kerngeschäft, rechnen Sie das mal über ein Jahr durch.
      </p>

      <h2>Unser Fazit: Ehrlich und klar</h2>
      <p>
        Selbst machen kann sinnvoll sein – am Anfang, im Test, mit begrenztem Budget. Aber für ein Unternehmen, das Kunden über seine Website gewinnen will, lohnt sich die professionelle Lösung fast immer. Nicht wegen des Designs. Sondern weil eine gute Website Aufträge bringt – und eine schlechte nicht.
      </p>
    </>
  ),

  'homepage-baukasten-vs-professionell': (
    <>
      <p>
        Wix, Squarespace, Jimdo – der Markt für Website-Baukästen ist riesig. Millionen von Menschen erstellen damit täglich ihre erste Website. Und doch hört man immer wieder: „Ich hab eine Website, aber sie bringt mir nichts." Woran liegt das? Und was macht den echten Unterschied zu einer professionell entwickelten Website?
      </p>

      <h2>Was Baukästen gut können</h2>
      <p>
        Halten wir es fair: Baukästen sind für bestimmte Einsatzzwecke hervorragend. Sie sind günstig, schnell zu bedienen und bieten vorgefertigte Designs, die optisch ansprechend wirken. Für einfache Portfolio-Seiten, Landingpages für Events oder erste Präsenzen kleiner Nebengewerbe leisten sie gute Arbeit.
      </p>

      <h2>Wo Baukästen an ihre Grenzen stoßen</h2>
      <p>
        Das Problem beginnt, wenn Anforderungen wachsen. Lokales SEO zum Beispiel – also das Optimieren Ihrer Website dafür, dass sie in Ihrer Stadt bei Suchanfragen erscheint – ist in Baukästen oft nur oberflächlich möglich. Strukturierte Daten (Schema.org), saubere URL-Strukturen, individuelle Meta-Tags pro Seite: Das sind technische Grundlagen, die Baukästen entweder gar nicht oder nur umständlich ermöglichen.
      </p>
      <p>
        Hinzu kommt die Ladegeschwindigkeit. Baukästen laden standardmäßig viele Ressourcen, die Sie gar nicht nutzen – weil das Template für alle Anwendungsfälle gebaut wurde. Professionelle Websites werden schlank entwickelt und laden nur, was wirklich gebraucht wird. Google bewertet Ladegeschwindigkeit als Rankingfaktor. Eine langsame Seite verliert Positionen.
      </p>

      <h2>Der Design-Unterschied, den Kunden spüren</h2>
      <p>
        Templates sind Templates. Mehrere tausend Unternehmen nutzen das gleiche Grunddesign – oft in ähnlichen Farben, mit ähnlichem Aufbau. Das erzeugt keine Wiedererkennung und keine Marke. Eine professionell entwickelte Website dagegen spiegelt Ihre spezifische Unternehmensidentität wider. Farben, Typografie, Bildsprache, Ton – alles ist auf Sie abgestimmt.
      </p>
      <p>
        Das hat einen messbaren Effekt: Besucher bleiben länger auf Seiten, die sich kohärent und professionell anfühlen. Sie vertrauen einem Unternehmen eher, wenn dessen Webauftritt Kompetenz ausstrahlt. Dieses Vertrauen ist der erste Schritt zum Auftrag.
      </p>

      <h2>Kontrolle und Flexibilität</h2>
      <p>
        Mit einem Baukasten sind Sie von der Plattform abhängig. Ändert Wix seine Preise oder stellt einen Service ein, haben Sie ein Problem. Bei einer professionell entwickelten Website – insbesondere wenn sie auf Next.js oder einem ähnlichen offenen Framework basiert – behalten Sie die volle Kontrolle. Der Code gehört Ihnen, und Sie können jederzeit wechseln.
      </p>

      <h2>Laufende Kosten im Vergleich</h2>
      <p>
        Squarespace kostet je nach Paket 16–49 € pro Monat. Wix ähnliches. Dazu kommen Domain-Kosten und eventuell Zusatz-Apps aus dem App-Store, die schnell weitere 20–50 € monatlich ausmachen. Im Vergleich: Eine professionell betreute Website für 79 € / Monat inklusive Hosting, Sicherheit, Updates und persönlichem Support ist oft sogar günstiger – und liefert mehr.
      </p>

      <h2>Unser Fazit</h2>
      <p>
        Baukasten oder professionell? Die Frage sollte lauten: Was soll Ihre Website für Ihr Unternehmen leisten? Wenn die Antwort „Kunden gewinnen und Vertrauen aufbauen" lautet, ist die professionelle Lösung in fast allen Fällen die bessere Wahl. Nicht weil Baukästen schlecht sind – sondern weil professionelle Websites einfach mehr können.
      </p>
    </>
  ),

  'warum-brauche-ich-eine-website': (
    <>
      <p>
        „Ich habe doch schon Google My Business und bin auf Facebook – brauche ich wirklich noch eine eigene Website?" Diese Frage stellen sich viele Inhaber lokaler Unternehmen. Die Antwort ist klar: Ja. Und hier ist, warum.
      </p>

      <h2>Google My Business ist kein Ersatz – es ist eine Ergänzung</h2>
      <p>
        Google My Business (heute: „Google Unternehmensprofil") ist ein mächtiges Werkzeug für lokale Sichtbarkeit. Es zeigt Ihre Öffnungszeiten, Adresse, Bewertungen und Fotos – und erscheint in Google Maps. Das ist wertvoll. Aber es hat entscheidende Grenzen: Sie können keine eigenen Texte schreiben, keine Leistungsseiten anlegen, keine Preise detailliert erklären und kein Vertrauen durch Referenzen oder eine „Über uns"-Seite aufbauen. Google My Business liefert Informationen. Eine Website verkauft.
      </p>

      <h2>Social Media: gut für Sichtbarkeit, schlecht für Kontrolle</h2>
      <p>
        Facebook, Instagram und Co. funktionieren gut für Aufmerksamkeit und Community. Aber sie gehören Ihnen nicht. Mark Zuckerberg entscheidet, ob und wie Ihre Inhalte ausgespielt werden. Algorithmus-Änderungen können Ihre organische Reichweite über Nacht halbieren. Und was passiert, wenn Ihr Konto gesperrt wird oder die Plattform an Relevanz verliert?
      </p>
      <p>
        Ihre eigene Website dagegen gehört Ihnen. Keine Abhängigkeit von Algorithmen, keine bezahlte Reichweite notwendig, keine Plattformregeln, die Ihre Inhalte einschränken. Das ist digitale Eigenständigkeit.
      </p>

      <h2>Kunden googeln – auch Empfehlungen werden überprüft</h2>
      <p>
        Stellen Sie sich vor: Jemand empfiehlt Ihnen mündlich einen Handwerksbetrieb. Was machen Sie als nächstes? Sie googeln ihn. Und wenn keine Website erscheint – oder eine veraltete, schlecht aussehende – sinkt das Vertrauen sofort. In der heutigen Zeit ist das Ausbleiben einer professionellen Website ein negatives Signal. Es suggeriert: Hier ist jemand, der sein Geschäft nicht ernst nimmt.
      </p>

      <h2>SEO funktioniert nur mit einer eigenen Website</h2>
      <p>
        Lokale Suchmaschinenoptimierung – also der Prozess, bei Google in Ihrer Stadt gefunden zu werden – setzt eine eigene Website voraus. Mit Google My Business allein können Sie keine Seiten für einzelne Leistungen anlegen, keine stadtspezifischen Inhalte erstellen und keine strukturierten Daten für Google bereitstellen. Eine professionelle Website ist die Grundlage für langfristige Sichtbarkeit in Suchmaschinen.
      </p>

      <h2>Ihre Website arbeitet für Sie – rund um die Uhr</h2>
      <p>
        Anders als Sie schläft Ihre Website nie. Um 2 Uhr nachts, wenn jemand nach einem Klempner in seiner Stadt sucht und Ihre Seite findet – dann kann er sich über Ihre Leistungen informieren, Ihnen eine Nachricht schicken und am nächsten Morgen als Anfrage in Ihrem Postfach landen. Das passiert ohne Ihr Zutun. Das ist der Wert einer Website, der sich nicht in Euro pro Stunde messen lässt.
      </p>

      <h2>Was es ohne Website kostet</h2>
      <p>
        Unternehmen ohne professionelle Website verlieren täglich Anfragen an Mitbewerber, die bei Google sichtbar sind. Wie viele Anfragen das konkret sind, weiß man erst, wenn man anfängt, es zu tracken. Aber eines ist sicher: Jeder Kunde, der Sie nicht findet, ist ein Kunde, den die Konkurrenz gewinnt.
      </p>

      <h2>Fazit: Eine Website ist kein Luxus – sie ist Grundlage</h2>
      <p>
        2025 ist eine professionelle Website für jedes lokale Unternehmen das, was früher ein Eintrag in den Gelben Seiten war – nur viel mächtiger. Sie ist Visitenkarte, Verkäufer, Referenzmappe und Erstanlaufstelle in einem. Wer darauf verzichtet, verzichtet auf einen wesentlichen Teil seiner potenziellen Kundschaft.
      </p>
    </>
  ),

  'seo-fuer-lokale-unternehmen': (
    <>
      <p>
        Sie haben eine Website – aber bei Google tauchen Sie nicht auf. Oder nur auf Seite 3, wo ohnehin kaum jemand schaut. Was können Sie dagegen tun? Dieser Artikel erklärt die wichtigsten Grundlagen der lokalen Suchmaschinenoptimierung (Local SEO) – verständlich und ohne Fachjargon.
      </p>

      <h2>Was ist lokales SEO?</h2>
      <p>
        Lokales SEO bezeichnet alle Maßnahmen, die dazu beitragen, dass Ihr Unternehmen bei standortbezogenen Suchanfragen bei Google erscheint. Wenn jemand „Friseur Stuttgart" oder „Elektriker Esslingen" sucht, entscheidet Google anhand von mehreren Faktoren, welche Unternehmen angezeigt werden. Lokales SEO beeinflusst genau diese Faktoren.
      </p>

      <h2>Die drei Säulen des lokalen SEO</h2>
      <p>
        Google bewertet lokale Unternehmen hauptsächlich nach drei Kriterien: Relevanz (stimmt das Angebot zur Suchanfrage?), Entfernung (wie nah ist das Unternehmen zum Suchenden?) und Bekanntheit (wie viele und wie gute Signale sendet das Unternehmen an Google?). Bekanntheit ist der Faktor, den Sie am stärksten beeinflussen können.
      </p>

      <h2>Schritt 1: Google Unternehmensprofil optimieren</h2>
      <p>
        Das wichtigste Werkzeug für lokales SEO ist kostenlos: das Google Unternehmensprofil (früher Google My Business). Füllen Sie es vollständig aus – Öffnungszeiten, Leistungen, Fotos, Beschreibung. Reagieren Sie auf alle Bewertungen, positiv wie negativ. Posten Sie regelmäßig Beiträge. Ein vollständiges und aktives Profil signalisiert Google: Dieses Unternehmen ist aktiv und relevant.
      </p>

      <h2>Schritt 2: Lokale Keywords auf der Website verwenden</h2>
      <p>
        Ihre Website sollte klar kommunizieren, wo Sie tätig sind. Das klingt offensichtlich – aber viele Websites nennen die Stadt gar nicht in ihren Texten. Erstellen Sie für wichtige Städte und Stadtteile, in denen Sie Kunden gewinnen wollen, eigene Unterseiten. Nicht als Spam, sondern mit echtem, hilfreichen Inhalt: Was bieten Sie dort an? Was macht Ihre lokale Kompetenz aus?
      </p>

      <h2>Schritt 3: Strukturierte Daten einbinden</h2>
      <p>
        Schema.org-Markup ist Code, der Google erklärt, was Ihre Website enthält: Ist das eine Arztpraxis? Ein Restaurant? Ein Handwerksbetrieb? Mit diesen sogenannten strukturierten Daten können Sie Google direkt mitteilen: Hier ist mein Name, meine Adresse, meine Telefonnummer, meine Öffnungszeiten. Das verbessert die Chance, in den sogenannten „Rich Results" von Google zu erscheinen.
      </p>

      <h2>Schritt 4: Bewertungen aktiv sammeln</h2>
      <p>
        Google-Bewertungen sind ein enormer Vertrauensfaktor – für Kunden und für Google selbst. Unternehmen mit vielen positiven Bewertungen ranken in der lokalen Suche besser. Bitten Sie zufriedene Kunden aktiv um eine Bewertung. Ein einfacher Link zu Ihrem Google-Profil per WhatsApp oder E-Mail reicht oft schon aus. Antworten Sie immer auf Bewertungen – das zeigt Engagement.
      </p>

      <h2>Schritt 5: Technische Grundlagen sicherstellen</h2>
      <p>
        Eine Website, die langsam lädt oder auf dem Smartphone schlecht aussieht, wird von Google schlechter bewertet. Mobile-First-Indexierung bedeutet: Google bewertet Ihre Seite so, wie sie auf einem Smartphone aussieht. Ladezeit unter 3 Sekunden, saubere mobile Darstellung und ein SSL-Zertifikat (https://) sind absolute Grundvoraussetzungen für gutes Ranking.
      </p>

      <h2>Wie lange dauert SEO?</h2>
      <p>
        Das ist die unbequeme Wahrheit: SEO ist kein Sprint, es ist ein Marathon. Erste Ergebnisse sehen Sie oft nach 4–12 Wochen. Nachhaltige Positionierungen in hart umkämpften Keywords können Monate bis über ein Jahr dauern. Dafür hält der Effekt – anders als bei bezahlter Werbung, die sofort aufhört zu wirken, wenn Sie nicht mehr zahlen.
      </p>

      <h2>Was NEON Agentur für Sie tut</h2>
      <p>
        Bei der Erstellung Ihrer Website durch NEON Agentur sind technische SEO-Grundlagen bereits inklusive: schnelle Ladezeiten, saubere URL-Strukturen, mobiles Design, Meta-Tags und strukturierte Daten. Wir geben Ihrer Website das Fundament, auf dem gutes lokales SEO aufbauen kann.
      </p>
    </>
  ),
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'NEON Agentur', url: 'https://neon-bw.de' },
    publisher: { '@type': 'Organization', name: 'NEON Agentur', url: 'https://neon-bw.de' },
  }

  const content = articleContent[post.slug]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-dark-bg pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(197,247,79,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,247,79,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div className="container-xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Zurück zum Blog
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${
                  categoryColors[post.category] ?? 'bg-white/10 text-white/60'
                }`}
              >
                <Tag size={11} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                {post.category}
              </span>
              <span className="text-white/30 text-xs flex items-center gap-1.5">
                <Clock size={12} aria-hidden="true" />
                {post.readTime} Lesezeit
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-off-white leading-[1.15] tracking-tight mb-5">
              {post.title}
            </h1>
            <p className="text-lg text-white/55 leading-relaxed max-w-2xl mb-6">
              {post.description}
            </p>
            <p className="text-white/30 text-sm">
              Veröffentlicht am{' '}
              {new Date(post.date).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}{' '}
              · NEON Agentur
            </p>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section-pad bg-off-white">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-headings:font-bold prose-headings:text-text-dark prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-5 max-w-none">
              {content}
            </div>

            {/* CTA Box */}
            <div className="mt-16 bg-dark-bg rounded-2xl p-8 md:p-10 border border-dark-border relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `linear-gradient(rgba(197,247,79,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,247,79,0.1) 1px, transparent 1px)`,
                  backgroundSize: '60px 60px',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-3 py-1.5 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon" aria-hidden="true" />
                  <span className="text-neon/80 text-xs font-medium">Kostenloses Erstgespräch</span>
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-off-white mb-3">
                  Bereit für Ihre neue Website?
                </h2>
                <p className="text-white/50 mb-6 leading-relaxed">
                  Lassen Sie uns in einem kurzen, unverbindlichen Gespräch herausfinden, was Ihre Website wirklich braucht. Kostenlos, persönlich, ohne Verkaufsdruck.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
                >
                  Jetzt kostenloses Erstgespräch vereinbaren
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-neon-dim font-semibold hover:underline text-sm"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Weitere Artikel lesen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
