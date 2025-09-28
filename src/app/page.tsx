'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { slideImages, homeCategoryImg, topPhotographers, testimonials } from '@/lib/data';
import { HomeCategoryImage, SlideImage, TopPhotographer, Testimonial } from "@/lib/types";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNext = () => setCurrentIndex(prev => (prev === slideImages.length - 1 ? 0 : prev + 1));
  const goToPrevious = () => setCurrentIndex(prev => (prev === 0 ? slideImages.length - 1 : prev - 1));
  
  useEffect(() => {
    const slideInterval = setInterval(goToNext, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-[-1]" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/HomeBG.jpg')"}}></div>
        <div className="container px-4 z-10">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-lg font-light text-gray-300 mb-4 tracking-wider">A WORLD OF IMAGERY</h4>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Find Your Next Inspiration</h1>
            <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
              Explore thousands of high-quality images from the world’s best photographers.
            </p>
            <a href="#category-section" className="btn btn-primary"><span>Explore Now</span><i className="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      <section id="category-section" className="py-20 px-8 max-w-[1600px] mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeCategoryImg.map((category: HomeCategoryImage) => (
            <Link key={category.id} href={`/category/${category.alt.toLowerCase()}`} className="relative h-55 rounded-2xl overflow-hidden shadow-lg cursor-pointer group transition-transform duration-300 hover:scale-105 hover:shadow-teal-500/20 dark:hover:shadow-cyan-400/20">
              <Image src={category.src} alt={category.alt} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-white">{category.alt}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <h1 className="text-5xl font-bold text-center mb-12">Featured Shots</h1>
        <div className="max-w-7xl  mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {slideImages.map((image: SlideImage) => (
              <div key={image.id} className="flex-shrink-0 w-full relative h-[700px]">
                <Image src={image.src} alt={image.title} layout="fill" objectFit="cover" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white text-left">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/60 transition"><i className="fas fa-chevron-left"></i></button>
          <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/60 transition"><i className="fas fa-chevron-right"></i></button>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <h2 className="text-5xl font-bold text-center mb-12">Featured Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {topPhotographers.map((photographer: TopPhotographer) => (
            <div key={photographer.id} className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-teal-500/20 dark:hover:shadow-cyan-400/20">
              <Image src={photographer.avatarUrl} alt={photographer.name} width={100} height={100} className="rounded-full mx-auto mb-4 border-4 border-gray-300 dark:border-gray-600" />
              <h3 className="text-2xl font-semibold">{photographer.name}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">{photographer.specialty}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="py-20 px-4 bg-gray-50 dark:bg-black/20">
        <h2 className="text-5xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-[500px] shadow-lg">
              <p className="italic text-gray-700 dark:text-gray-300 mb-6 text-center">"{testimonial.quote}"</p>
              <div className="flex items-center justify-center gap-4">
                <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="rounded-full" />
                <span className="font-semibold">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto my-8 p-12 bg-gray-100/50 dark:bg-gray-800/60 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl">
          <h2 className="text-5xl font-bold mb-4">Join Our Community</h2>
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-8">Sign up to share your work, connect with other photographers, and get inspired.</p>
          <div className="text-[20px] font-bold mb-4 flex justify-center gap-4"><Link href="/signup" className="btn btn-primary">Get Started</Link></div>
        </div>
      </section>
    </>
  );
}