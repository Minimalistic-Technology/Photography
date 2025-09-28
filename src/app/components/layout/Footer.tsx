import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-3xl text-gray-900 dark:text-white font-thin mb-4" style={{ fontFamily: 'var(--font-birthstone)'}}>
            <Image src="/Images/aperture.png" alt="PhotoGallery Logo" width={30} height={30} className="dark:filter dark:invert" />
            PhotoGallery
          </Link>
          <p className="text-sm leading-relaxed">Discover and share stunning photography from around the world.</p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-xl hover:text-gray-900 dark:hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-xl hover:text-gray-900 dark:hover:text-white transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-xl hover:text-gray-900 dark:hover:text-white transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-xl hover:text-gray-900 dark:hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/explore" className="hover:text-gray-900 dark:hover:text-white transition">Explore</Link></li>
            <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="/category/nature" className="hover:text-gray-900 dark:hover:text-white transition">Nature</Link></li>
            <li><Link href="/category/wildlife" className="hover:text-gray-900 dark:hover:text-white transition">Wildlife</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} PhotoGallery. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;