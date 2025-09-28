'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter, useSearchParams } from 'next/navigation';
import { galleryImg } from '../../lib/data';
import { GalleryImage } from '../../lib/types';
import { useLikedPhotos } from '../../hooks/useLikedPhotos';

const userProfile = {
  name: "Annie Leibovitz",
  handle: "@annieleibovitz",
  avatarUrl: "https://i.pravatar.cc/150?4",
  stats: { photos: 38, likes: "12.k", followers: "5,281" }
};

const initialUserImages = galleryImg.filter(img => img.photographer === "Annie Leibovitz");

function ProfileComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState('dashboard');
  const [myPhotos, setMyPhotos] = useState<GalleryImage[]>(initialUserImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { likedIds } = useLikedPhotos();
  const [likedPhotos, setLikedPhotos] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const liked = galleryImg.filter(image => likedIds.has(image.id));
    setLikedPhotos(liked);
  }, [likedIds]);

  useEffect(() => {
    const view = searchParams.get('view');
    if (view && ['my-photos', 'liked-photos', 'dashboard'].includes(view)) {
      setActiveView(view);
    } else {
      setActiveView('dashboard'); 
    }
  }, [searchParams]);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event("storage")); 
    router.push('/');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImage: GalleryImage = {
        id: Date.now(),
        src: URL.createObjectURL(file),
        alt: 'A newly uploaded image',
        name: file.name.split('.').slice(0, -1).join('.'),
        photographer: userProfile.name,
        category: 'uploads',
      };
      setMyPhotos(prevPhotos => [newImage, ...prevPhotos]);
      router.push('/profile?view=my-photos', { scroll: false });
    }
  };

  const getButtonClasses = (viewName: string) => {
    const base = "flex items-center gap-4 w-full p-3 rounded-lg text-lg font-medium transition-all duration-200";
    if (activeView === viewName) {
      return `${base} bg-teal-600 dark:bg-cyan-400 text-white dark:text-black shadow-lg scale-105`;
    }
    return `${base} text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white`;
  };

  const PhotoCard = ({ image }: { image: GalleryImage }) => (
    <div key={image.id} className="group relative mb-6 break-inside-avoid rounded-2xl overflow-hidden shadow-lg">
      <Image src={image.src} alt={image.alt} width={500} height={500} className="w-full h-auto object-cover" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg">{image.name}</h3>
        <p className="text-gray-300 text-sm">by {image.photographer}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="flex flex-col lg:flex-row gap-8 max-w-[1500px] mx-auto px-4 sm:px-8">
        <aside className="lg:w-80 flex-shrink-0 lg:sticky lg:top-28">
          <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl h-fit shadow-2xl">
            <div className="text-center border-b border-gray-200 dark:border-white/10 pb-6 mb-6">
              <Image src={userProfile.avatarUrl} alt={userProfile.name} width={120} height={120} className="rounded-full border-4 border-teal-500 dark:border-cyan-400 mb-4 mx-auto" />
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">{userProfile.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">{userProfile.handle}</p>
            </div>
            <nav>
              <ul className="flex flex-col gap-4">
                <li><button onClick={() => router.push('/profile?view=dashboard', { scroll: false })} className={getButtonClasses('dashboard')}><i className="w-6 text-center fas fa-th-large"></i> Dashboard</button></li>
                <li><button onClick={() => router.push('/profile?view=my-photos', { scroll: false })} className={getButtonClasses('my-photos')}><i className="w-6 text-center fas fa-camera-retro"></i> My Photos</button></li>
                <li><button onClick={() => router.push('/profile?view=liked-photos', { scroll: false })} className={getButtonClasses('liked-photos')}><i className="w-6 text-center fas fa-heart"></i> Liked Photos</button></li>
              </ul>
            </nav>
            <button onClick={handleSignOut} className="flex items-center justify-center gap-3 w-full mt-8 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg font-medium transition-colors hover:bg-red-500 hover:text-white">
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1">
          {activeView === 'dashboard' && (
            <section>
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl"><p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">{myPhotos.length}</p><p className="text-2xl text-gray-500 dark:text-gray-400 mt-1">Photos</p></div>
                <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl"><p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">{likedPhotos.length}</p><p className="text-2xl text-gray-500 dark:text-gray-400 mt-1">Likes</p></div>
                <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl"><p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">{userProfile.stats.followers}</p><p className="text-2xl text-gray-500 dark:text-gray-400 mt-1">Followers</p></div>
              </div>
            </section>
          )}

          {activeView === 'my-photos' && (
            <section>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-white/10">
                <h2 className="text-5xl font-bold text-gray-900 dark:text-white">My Photos</h2>
                <button onClick={handleUploadClick} className="btn btn-primary"><i className="fas fa-upload"></i> Upload</button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/gif"/>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                {myPhotos.map(image => <PhotoCard key={image.id} image={image} />)}
              </div>
            </section>
          )}

          {activeView === 'liked-photos' && (
            <section>
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">Liked Photos</h2>
              {likedPhotos.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                  {likedPhotos.map(image => <PhotoCard key={image.id} image={image} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl">
                  <p className="text-xl text-gray-500 dark:text-gray-400">You haven't liked any photos yet.</p>
                  <Link href="/explore" className="btn btn-primary mt-6">Explore Photos</Link>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileComponent />
    </Suspense>
  );
}