// src/lib/types.ts

export interface SlideImage {
  id: number;
  src: string;
  title: string;
}

export interface HomeCategoryImage {
  id: number;
  src: string;
  alt: string;
}

export interface TopPhotographer {
  id: number;
  name: string;
  avatarUrl: string;
  specialty: string;
}

export interface ExploreCategory {
  id: number;
  src: string;
  alt: string;
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  name: string;
  photographer: string;
  category: string;
  liked?: boolean;
  comments?: Comment[]; 
}

export interface LatestShot {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  avatar: string;
}