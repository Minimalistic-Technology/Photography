'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 flex items-center justify-center text-xl z-50 shadow-lg transition hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
    </button>
  );
};

export default ThemeSwitcher;