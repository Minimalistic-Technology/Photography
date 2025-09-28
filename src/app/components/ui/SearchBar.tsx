// src/app/components/ui/SearchBar.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <form 
      className="flex items-center w-full max-w-xl h-16 bg-white/90 dark:bg-gray-900/90 border border-gray-300 dark:border-gray-700 rounded-full shadow-2xl" 
      onSubmit={handleSubmit}
    >
      <input
        name="search"
        type="text"
        className="w-full h-full bg-transparent pl-8 pr-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-xl"
        placeholder="Search for photos, categories..."
        autoFocus
      />
      <button type="submit" className="px-8 text-gray-400 hover:text-teal-600 dark:hover:text-cyan-400 transition-colors" aria-label="Submit search">
        <i className="fas fa-search text-xl"></i>
      </button>
    </form>
  );
}