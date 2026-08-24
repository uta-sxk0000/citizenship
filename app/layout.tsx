import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';
import { PWARegister } from '@/src/components/PWARegister';

export const metadata: Metadata = {
  metadataBase: new URL('https://citizenship.khadkasagar.name.np'),
  applicationName: 'Citizenship Practice',
  manifest: '/manifest.webmanifest',
  title: {
    default: 'U.S. Citizenship Practice | Naturalization Interview Study',
    template: '%s | Citizenship Practice',
  },
  description:
    'Practice U.S. naturalization interview questions, civics, English pronunciation, and optional Nepali translations.',
  openGraph: {
    title: 'U.S. Citizenship Practice | Naturalization Interview Study',
    description:
      'Practice naturalization interview questions, civics, pronunciation, and optional Nepali translations.',
    url: 'https://citizenship.khadkasagar.name.np',
    siteName: 'Citizenship Practice',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'U.S. Citizenship Practice',
    description:
      'Naturalization interview, civics, and pronunciation practice.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Citizenship Practice',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b2a4a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <PWARegister />
      </body>
    </html>
  );
}
