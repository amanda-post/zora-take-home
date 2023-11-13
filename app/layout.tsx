import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zora FE Take Home Challenge',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex min-h-screen flex-col items-center justify-between p-20 bg-gradient-to-b from-slate-900 to-slate-800'>
          <div className='bg-gradient-to-b from-slate-500 to-slate-700 min-h-screen rounded-lg w-full p-10'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
