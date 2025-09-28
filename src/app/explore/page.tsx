'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { exploreCategoryImg, galleryImg, topPhotographers } from '@/lib/data';
import { GalleryImage } from '@/lib/types';
import ImageModal from '@/app/components/ui/ImageModal';
import { useLikedPhotos } from '@/hooks/useLikedPhotos';

export default function ExplorePage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { likedIds, toggleLike } = useLikedPhotos();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const images = React.useMemo(() => galleryImg.map(img => ({
    ...img,
    liked: likedIds.has(img.id),
  })), [likedIds]);

  const handleLikeClick = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toggleLike(id);
    if (selectedImage && selectedImage.id === id) {
      setSelectedImage({ ...selectedImage, liked: !selectedImage.liked });
    }
  };

  const openModalWithImage = (image: GalleryImage) => {
    const currentImageState = images.find(img => img.id === image.id);
    setSelectedImage(currentImageState || image);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <>
      <div className="pt-28">
        <section className="py-16 px-8 max-w-[1600px] mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12">Explore Categories</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(265px,1fr))] gap-6">
            {exploreCategoryImg.map(category => (
              <Link key={category.id} href={`/category/${category.alt.toLowerCase()}`} className="block group">
                <div className="relative h-55 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-teal-500/20 dark:group-hover:shadow-cyan-400/20">
                  <Image src={category.src} alt={category.alt} layout="fill" objectFit="cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <h3 className="text-2xl font-semibold text-white">{category.alt}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-16 px-8 max-w-[1500px] mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12">Explore Gallery</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {images.map(image => ( 
              <div key={image.id} className="relative mb-6 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group" onClick={() => openModalWithImage(image)}>
                <Image src={image.src} alt={image.alt} width={500} height={500} className="w-full h-auto transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="self-end transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-3">
                      <button className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-300 ${image.liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'}`} onClick={(e) => handleLikeClick(image.id, e)} aria-label="Like photo"><i className="fas fa-heart"></i></button>
                      <a href={image.src} download className="w-10 h-10 flex items-center justify-center bg-white/90 text-gray-800 hover:bg-white rounded-full transition" onClick={(e) => e.stopPropagation()} aria-label="Download photo"><i className="fas fa-download"></i></a>
                    </div>
                  </div>
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-left">
                    <h3 className="text-xl font-bold text-white">{image.name}</h3>
                    <p className="text-sm text-white/80">by {image.photographer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="py-16 px-4 sm:px-8 max-w-[1500px] mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">Recommended Photographers</h2>
          {!hasMounted ? <div className="text-center text-gray-400">Loading Photographers...</div> : (
            <div className="flex flex-col gap-12">
              {topPhotographers.map(photographer => {
                const photographerPhotos = images.filter(img => img.photographer === photographer.name);
                return (
                  <div key={photographer.id} className="bg-white dark:bg-gray-800/20 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <Image 
                          src={photographer.avatarUrl} 
                          alt={photographer.name} 
                          width={80} height={80} 
                          className="rounded-full border-4 border-teal-600 dark:border-cyan-400 flex-shrink-0" 
                        />
                        <div>
                          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">{photographer.name}</h3>
                          <p className="text-lg text-gray-600 dark:text-gray-400">{photographer.specialty}</p>
                        </div>
                      </div>
                      <Link href="#" className="btn btn-primary px-6 py-2 text-base self-start sm:self-center">
                        View Profile
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
                      {photographerPhotos.slice(0, 4).map(photo => (
                        <div key={photo.id} className="rounded-lg overflow-hidden cursor-pointer group relative aspect-square" onClick={() => openModalWithImage(photo)}>
                          <Image src={photo.src} alt={photo.alt} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <i className="fas fa-expand text-white text-3xl"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>

      <ImageModal 
        image={selectedImage} 
        allImages={images}
        onClose={() => setSelectedImage(null)}
        onLike={handleLikeClick} 
        onAddComment={(id, text) => console.log(id, text)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  );
}