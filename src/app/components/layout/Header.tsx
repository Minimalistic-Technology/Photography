'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '@/app/components/ui/SearchBar';
import { exploreCategoryImg } from '@/lib/data';
import { ExploreCategory } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';

const MobileNavItem = ({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClasses = "bg-gray-900/10 text-gray-900 dark:bg-white/10 dark:text-white";
  const baseClasses = "flex items-center gap-4 p-4 rounded-lg text-lg font-semibold";
  const hoverClasses = "hover:bg-gray-200 dark:hover:bg-neutral-700/50 text-gray-700 dark:text-gray-300";

  return (
    <li>
      <Link href={href} className={`${baseClasses} ${isActive ? activeClasses : hoverClasses}`}>
        <i className={`w-6 text-center ${icon}`}></i>
        <span>{children}</span>
      </Link>
    </li>
  );
};

export default function Header() {
  const [activeOverlay, setActiveOverlay] = useState<'menu' | 'search' | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setActiveOverlay(null); }, [pathname]);
  
  useEffect(() => {
    if (activeOverlay === 'menu') document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [activeOverlay]);

  const headerClasses = isScrolled 
    ? "bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-gray-300 dark:border-neutral-700"
    : "bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-sm";

  const featuredCategories = exploreCategoryImg.slice(0, 4);
  const otherCategories = exploreCategoryImg.slice(4);

  return (
    <>
      <header className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] rounded-full transition-all duration-300 ${headerClasses}`}>
        <nav className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-4xl text-black dark:text-white font-thin" style={{ fontFamily: 'var(--font-birthstone)'}} aria-label="PhotoGallery Home">
            <Image src="/Images/aperture.png" alt="PhotoGallery Logo" width={40} height={40} className="dark:filter dark:invert" />
            PhotoGallery
          </Link>
          
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8">
              <li><Link href="/" className={`pb-1 text-lg font-medium transition ${pathname === '/' ? 'text-black dark:text-white border-b-2 border-gray-800 dark:border-gray-200' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>Home</Link></li>
              <li><Link href="/explore" className={`pb-1 text-lg font-medium transition ${pathname === '/explore' ? 'text-black dark:text-white border-b-2 border-gray-800 dark:border-gray-200' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>Explore</Link></li>
              <li className="group">
                <a className="pb-4 pt-4 text-lg font-medium text-gray-500 dark:text-gray-400 cursor-pointer" aria-haspopup="true">Categories</a>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2" aria-label="Categories Mega Menu">
                  <div className="container mx-auto p-8 bg-gray-100 dark:bg-neutral-800/90 backdrop-blur-md rounded-lg shadow-2xl mt-2 w-[1500px] border border-gray-300 dark:border-neutral-700">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      <div className="lg:col-span-2">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wider uppercase">Featured Categories</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          {featuredCategories.map((cat) => (
                            <Link key={cat.id} href={`/category/${cat.alt.toLowerCase()}`} className="group/item block">
                              <div className="overflow-hidden rounded-lg aspect-square relative">
                                <Image src={cat.src} alt={cat.alt} layout="fill" objectFit="cover" className="group-hover/item:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-4"><span className="text-white font-semibold text-lg">{cat.alt}</span></div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wider uppercase">All Categories</h3>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {otherCategories.map((cat) => (
                            <li key={cat.id}>
                              <Link href={`/category/${cat.alt.toLowerCase()}`} className="block text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-1 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700">{cat.alt}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setActiveOverlay(activeOverlay === 'search' ? null : 'search')} className="flex items-center justify-center w-12 h-12 rounded-full text-xl text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-neutral-700/50 transition" aria-label="Toggle Search">
              <i className={`fas transition-transform duration-300 ${activeOverlay === 'search' ? 'fa-times' : 'fa-search'}`}></i>
            </button>
            {isLoggedIn ? (
              <>
                <Link href="/profile?view=my-photos" className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full text-xl text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-neutral-700/50 transition" aria-label="Upload Photo"><i className="fas fa-upload"></i></Link>
                <Link href="/profile" className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full text-xl text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-neutral-700/50 transition" aria-label="View Profile"><i className="fas fa-user"></i></Link>
              </>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center justify-center h-12 px-6 rounded-full text-lg font-semibold text-gray-900 dark:text-gray-100 bg-gray-300/80 dark:bg-neutral-700/80 hover:bg-gray-300 dark:hover:bg-neutral-700 transition" aria-label="Login">Login</Link>
            )}
            <button onClick={() => setActiveOverlay(activeOverlay === 'menu' ? null : 'menu')} className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full text-xl text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-neutral-700/50 transition" aria-label="Toggle Menu" aria-expanded={activeOverlay === 'menu'}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
      </header>
      
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${activeOverlay === 'menu' ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setActiveOverlay(null)}></div>
      <div className={`lg:hidden fixed top-0 w-4/5 max-w-sm h-full bg-gray-100/80 dark:bg-neutral-900/80 backdrop-blur-lg border-l border-gray-300 dark:border-neutral-700 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-50 ${activeOverlay === 'menu' ? 'right-0' : '-right-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-neutral-700">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">Menu</span>
          <button onClick={() => setActiveOverlay(null)} className="w-10 h-10 flex items-center justify-center rounded-full text-xl text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-neutral-700/50 transition" aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="flex-grow p-6">
          <ul className="flex flex-col gap-4">
            <MobileNavItem href="/" icon="fas fa-home">Home</MobileNavItem>
            <MobileNavItem href="/explore" icon="fas fa-compass">Explore</MobileNavItem>
          </ul>
        </nav>
        <div className="p-6 border-t border-gray-300 dark:border-neutral-700">
          <Link href={isLoggedIn ? "/profile" : "/login"} className="flex items-center gap-4 p-4 rounded-lg text-lg font-semibold hover:bg-gray-200 dark:hover:bg-neutral-700/50 text-gray-700 dark:text-gray-300">
            <i className="w-6 text-center fas fa-user-circle"></i>
            <span>{isLoggedIn ? "Profile" : "Login"}</span>
          </Link>
        </div>
      </div>
    </>
  );
}