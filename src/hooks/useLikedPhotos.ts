'use client';

import { useState, useEffect } from 'react';

// This function safely gets the liked photos from localStorage
const getLikedPhotos = (): Set<number> => {
  // Check if window is defined to avoid server-side errors
  if (typeof window === 'undefined') {
    return new Set();
  }
  try {
    const likedPhotos = localStorage.getItem('likedPhotos');
    // Parse the stored JSON or return an empty Set if nothing is stored
    return likedPhotos ? new Set(JSON.parse(likedPhotos)) : new Set();
  } catch (error) {
    console.error('Failed to parse liked photos from localStorage', error);
    return new Set();
  }
};

export const useLikedPhotos = () => {
  const [likedIds, setLikedIds] = useState<Set<number>>(getLikedPhotos());

  // This effect runs whenever the 'likedIds' state changes
  useEffect(() => {
    // Convert the Set to an array and store it as a JSON string in localStorage
    localStorage.setItem('likedPhotos', JSON.stringify(Array.from(likedIds)));
  }, [likedIds]);

  const toggleLike = (id: number) => {
    setLikedIds(prevLikedIds => {
      const newLikedIds = new Set(prevLikedIds);
      if (newLikedIds.has(id)) {
        newLikedIds.delete(id); // Unlike
      } else {
        newLikedIds.add(id); // Like
      }
      return newLikedIds;
    });
  };

  return { likedIds, toggleLike };
};