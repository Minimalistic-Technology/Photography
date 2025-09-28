'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GalleryImage, Comment } from '../../../lib/types';

interface ImageModalProps {
  image: GalleryImage | null;
  allImages: GalleryImage[];
  onClose: () => void;
  onLike: (id: number) => void;
  onAddComment: (id: number, commentText: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose, onLike, onAddComment, onNext, onPrevious }) => {
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrevious();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && image) {
      onAddComment(image.id, newComment);
      setNewComment('');
    }
  };

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[1000] p-4 sm:p-8" onClick={onClose}>
      <div className="flex w-full h-full max-w-7xl max-h-[90vh] bg-white dark:bg-black rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex-[3] relative flex items-center justify-center bg-gray-100 dark:bg-black overflow-hidden rounded-l-2xl">
          <button onClick={onPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-12 h-12 bg-white/70 dark:bg-black/30 rounded-full text-gray-900 dark:text-white border border-gray-200/0 dark:border-white/20 flex items-center justify-center transition hover:bg-white dark:hover:bg-black/50"><i className="fas fa-chevron-left"></i></button>
          <Image src={image.src} alt={image.alt} layout="fill" objectFit="contain" />
          <button onClick={onNext} className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-12 h-12 bg-white/70 dark:bg-black/30 rounded-full text-gray-900 dark:text-white border border-gray-200/0 dark:border-white/20 flex items-center justify-center transition hover:bg-white dark:hover:bg-black/50"><i className="fas fa-chevron-right"></i></button>
        </div>
        <div className="flex-1 min-w-[350px] max-w-[350px] bg-white dark:bg-[#1e1e1e] p-6 flex flex-col h-full rounded-r-2xl">
          <div className="pb-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{image.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">by {image.photographer}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onLike(image.id)} className={`w-10 h-10 flex items-center justify-center rounded-full transition ${image.liked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'}`}><i className="fas fa-heart"></i></button>
              <a href={image.src} download className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition"><i className="fas fa-download"></i></a>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-2xl text-gray-600 dark:text-white transition hover:scale-125">&times;</button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto py-6 space-y-6 border-b border-gray-200 dark:border-gray-800">
            {image.comments && image.comments.length > 0 ? image.comments.map((comment: Comment) => (
              <div key={comment.id} className="flex gap-4 items-start">
                <Image src={comment.avatar} alt={comment.author} width={32} height={32} className="rounded-full flex-shrink-0" />
                <div className="text-left"><span className="font-semibold text-gray-900 dark:text-white block">{comment.author}</span><p className="text-gray-600 dark:text-gray-400 text-sm leading-snug">{comment.text}</p></div>
              </div>
            )) : <p className="text-gray-500 text-center mt-8">No comments yet.</p>}
          </div>
          <form className="pt-4 mt-auto flex gap-2" onSubmit={handleSubmitComment}>
            <input type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-gray-700 rounded-full py-2 px-4 text-gray-900 dark:text-white focus:outline-none focus:border-teal-600 dark:focus:border-cyan-500" />
            <button type="submit" className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-cyan-500 dark:text-black dark:hover:bg-cyan-400 font-semibold rounded-full px-4 transition">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;