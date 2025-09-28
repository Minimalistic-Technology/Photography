'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 1. Import usePathname

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // 2. Get the current URL path

  useEffect(() => {
    // This code now runs on initial load AND every time the path changes
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

  }, [pathname]); // 3. Add pathname as a dependency

  return { isLoggedIn };
}