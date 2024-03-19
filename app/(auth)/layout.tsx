import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import ToasterContext from '@/context/ToasterContext';
import AuthProvider from '@/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie-Hub Auth',
  description: 'Explore The World Of Movie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToasterContext />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
