import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/libs/providers/AppProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chatbot flow builder',
  description: 'Chatbot flow builder using react-flow, TailwindCSS, ChakraUI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
