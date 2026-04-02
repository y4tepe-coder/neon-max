export const blogPosts = [
  {
    slug: 'was-kostet-eine-website',
    title: 'Was kostet eine Website? – Ehrliche Preisübersicht 2025',
    description: 'Website-Kosten im Überblick: Von der Baukastenlösung bis zur professionellen Agentur. Wir zeigen transparent, was eine gute Website wirklich kostet.',
    date: '2025-03-01',
    readTime: '5 Min',
    category: 'Ratgeber',
  },
  {
    slug: 'website-selber-machen-oder-agentur',
    title: 'Website selber machen oder Agentur beauftragen?',
    description: 'Baukästen wie Wix oder Squarespace klingen verlockend. Aber wann lohnt sich eine professionelle Agentur wirklich? Die ehrliche Antwort.',
    date: '2025-03-10',
    readTime: '6 Min',
    category: 'Ratgeber',
  },
  {
    slug: 'homepage-baukasten-vs-professionell',
    title: 'Baukasten vs. professionelle Website – Der echte Unterschied',
    description: 'Wix, Squarespace, Jimdo – oder doch eine professionelle Lösung? Was der Unterschied wirklich bedeutet, erklärt dieser Artikel.',
    date: '2025-03-20',
    readTime: '5 Min',
    category: 'Vergleich',
  },
  {
    slug: 'warum-brauche-ich-eine-website',
    title: 'Warum brauche ich als lokales Unternehmen eine Website?',
    description: 'Reicht Google My Business nicht? Warum lokale Unternehmen 2025 unbedingt eine eigene Website brauchen – und was ohne passiert.',
    date: '2025-04-01',
    readTime: '4 Min',
    category: 'Grundlagen',
  },
  {
    slug: 'seo-fuer-lokale-unternehmen',
    title: 'SEO für lokale Unternehmen – So wirst du in deiner Stadt gefunden',
    description: 'Wie schaffst du es, dass dein Unternehmen bei Google ganz oben erscheint? Die wichtigsten SEO-Grundlagen für lokale Betriebe einfach erklärt.',
    date: '2025-04-10',
    readTime: '7 Min',
    category: 'SEO',
  },
]

export type BlogPost = (typeof blogPosts)[number]
