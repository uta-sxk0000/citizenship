import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/src/components/Footer';
import { Header } from '@/src/components/Header';

export const metadata: Metadata = {
  metadataBase: new URL('https://citizenship.khadkasagar.name.np'),
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
  icons: {
    icon: '/favicon.svg',
  },
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
      </body>
    </html>
  );
}
