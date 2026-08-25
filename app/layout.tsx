import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Inspiration } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation/navbar';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { PageTransitionProvider } from '@/components/providers/page-transition-provider';
import { InterfaceModeProvider } from '@/components/providers/interface-mode-provider';
import { siteConfig } from '@/data/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const inspiration = Inspiration({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inspiration',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }, { name: siteConfig.creativeName }],
  creator: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Jeet Rakholiya',
    'J.GAZE_',
    'Full-Stack Developer',
    'React.js',
    'Next.js',
    'FastAPI',
    'Python',
    'Videographer',
    'Video Editor',
    'Creative Developer',
    'Ahmedabad',
    'Gujarat',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} | ${siteConfig.creativeName}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verified JSON-LD structured data for Person and WebSite
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.name,
        alternateName: siteConfig.creativeName,
        url: siteConfig.url,
        jobTitle: siteConfig.primaryRole,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        sameAs: [
          siteConfig.github,
          siteConfig.linkedin,
          siteConfig.instagram,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.name} — Portfolio`,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${inspiration.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans min-h-screen flex flex-col selection:bg-accent selection:text-accent-foreground">
        <InterfaceModeProvider>
          <SmoothScroll>
            <PageTransitionProvider>
              <ScrollProgress />
              <Navbar />
              {children}
            </PageTransitionProvider>
          </SmoothScroll>
        </InterfaceModeProvider>
      </body>
    </html>
  );
}
