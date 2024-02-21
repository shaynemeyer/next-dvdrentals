import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header/Header';
import Image from 'next/image';

const IBMPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
});
export const metadata: Metadata = {
  title: 'DVD Rental Stores Inc.',
  description: 'Administrative application for managing DVD Rental Stores Inc.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlex.className} dark:bg-slate-700 dark:text-slate-300`}
      >
        {children}
      </body>
    </html>
  );
}
