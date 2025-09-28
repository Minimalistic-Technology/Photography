import { Poppins, Birthstone } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const birthstone = Birthstone({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-birthstone', 
});