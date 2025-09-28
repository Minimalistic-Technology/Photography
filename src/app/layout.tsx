import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { poppins, birthstone } from '@/app/fonts';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import ThemeSwitcher from '@/app/components/ui/ThemeSwitcher';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'PhotoGallery',
  description: 'Discover and share beautiful photography',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="flex flex-col bg-white dark:bg-black transition-colors duration-300">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}