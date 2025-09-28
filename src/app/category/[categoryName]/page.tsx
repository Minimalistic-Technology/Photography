'use client';

import React, { useState, Suspense, useMemo } from 'react';
import Image from 'next/image';
import { galleryImg } from '@/lib/data';
import { GalleryImage } from '@/lib/types';
import ImageModal from '@/app/components/ui/ImageModal';
import { useLikedPhotos } from '@/hooks/useLikedPhotos';
import { useParams } from 'next/navigation';

const IMAGES_PER_PAGE = 9;

function CategoryPageComponent() {
  const params = useParams();
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { likedIds, toggleLike } = useLikedPhotos();
  
  const categoryName = useMemo(() => 
    decodeURIComponent(params.categoryName as string), 
    [params.categoryName]
  );
  
  const filteredImages = useMemo(() => 
    galleryImg
      .filter(image => image.category === categoryName)
      .map(img => ({
        ...img,
        liked: likedIds.has(img.id),
      })), 
    [categoryName, likedIds]
  );
  
  const capitalizedTitle = useMemo(() =>
    categoryName
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase()),
    [categoryName]
  );

  const imagesToShow = useMemo(() => 
    filteredImages.slice(0, visibleCount), 
    [filteredImages, visibleCount]
  );

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + IMAGES_PER_PAGE);
  };

  const handleLikeClick = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent modal from opening
    toggleLike(id);
  };

  const handleAddComment = (id: number, commentText: string) => {
    console.log(`Comment added to image ${id}: ${commentText}`);
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % filteredImages.length;
    setSelectedImageIndex(nextIndex);
  };

  const handlePrevious = () => {
    if (selectedImageIndex === null) return;
    const prevIndex = (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImageIndex(prevIndex);
  };
  
  const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <>
      <main className="pt-20">
        <section className="py-16 text-center bg-black/20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white">{capitalizedTitle}</h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-400">
              Explore a curated collection of {filteredImages.length} high-quality photos in the {capitalizedTitle} category.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-8 max-w-8xl mx-auto">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12 bg-[#1e1e1e] rounded-2xl">
              <p className="text-gray-400">No photos found in this category.</p>
            </div>
          ) : (
            <>
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
                {imagesToShow.map((image, index) => (
                  <div 
                    key={image.id} 
                    className="relative mb-6 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group bg-[#1a1a1a] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10" 
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={900}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    {/* UPDATED OVERLAY with Like & Download Buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="self-end transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-2">
                          <button className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-300 ${image.liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'}`} onClick={(e) => handleLikeClick(image.id, e)} aria-label="Like photo">
                            <i className="fas fa-heart"></i>
                          </button>
                          <a href={image.src} download className="w-10 h-10 flex items-center justify-center bg-white/90 text-gray-800 hover:bg-white rounded-full transition" onClick={(e) => e.stopPropagation()} aria-label="Download photo">
                            <i className="fas fa-download"></i>
                          </a>
                        </div>
                      </div>
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-left">
                        <h2 className="text-xl font-bold text-white">{image.name}</h2>
                        <h3 className="text-sm text-white/80 font-light">By: {image.photographer}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {visibleCount < filteredImages.length && (
                <div className="text-center mt-12">
                  <button onClick={handleLoadMore} className="btn btn-primary text-lg">
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {selectedImage && (
        <ImageModal 
          image={selectedImage}
          allImages={filteredImages}
          onClose={() => setSelectedImageIndex(null)}
          onLike={handleLikeClick}
          onAddComment={handleAddComment}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center text-white py-40">Loading category...</div>}>
      <CategoryPageComponent />
    </Suspense>
  );
}