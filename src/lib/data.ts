import {
  SlideImage,
  HomeCategoryImage,
  TopPhotographer,
  ExploreCategory,
  GalleryImage,
  LatestShot,
  Testimonial
} from './types';

export const slideImages: SlideImage[] = [
  { id: 1, src: "https://picsum.photos/id/29/800/600", title: "Mountains" },
  { id: 2, src: "https://picsum.photos/id/37/800/600", title: "Sea" },
  { id: 3, src: "https://picsum.photos/id/28/800/600", title: "Forest" },
  { id: 4, src: "https://picsum.photos/id/46/800/600", title: "Desert" },
  { id: 5, src: "https://picsum.photos/id/43/800/600", title: "Cityscape" },
  { id: 6, src: "https://picsum.photos/id/49/800/600", title: "Abstract" },
  { id: 7, src: "https://picsum.photos/id/52/800/600", title: "Wildlife", },
];

export const homeCategoryImg: HomeCategoryImage[] = [
  { id: 1, src: "/Images/Animal.jpg", alt: "Animals" },
  { id: 2, src: "/Images/art.jpg", alt: "Art" },
  { id: 3, src: "/Images/Beauty.jpg", alt: "Beauty" },
  { id: 4, src: "/Images/Design.jpg", alt: "Design" },
  { id: 5, src: "/Images/Abstract.jpg", alt: "Abstract" },
  { id: 6, src: "/Images/Wildlife.jpg", alt: "Wildlife" },
  { id: 7, src: "/Images/House.jpg", alt: "Home" },
  { id: 8, src: "/Images/Nature.jpg", alt: "Nature" }
];

export const topPhotographers: TopPhotographer[] = [
  { id: 1, name: "Ansel Adams", avatarUrl: "https://i.pravatar.cc/150?1", specialty: "Landscape Photography" },
  { id: 2, name: "Dorothea Lange", avatarUrl: "https://i.pravatar.cc/150?2", specialty: "Documentary Photography" },
  { id: 3, name: "Steve McCurry", avatarUrl: "https://i.pravatar.cc/150?3", specialty: "Photojournalism" },
  { id: 4, name: "Annie Leibovitz", avatarUrl: "https://i.pravatar.cc/150?4", specialty: "Portrait Photography" },
  { id: 5, name: "Robert Capa", avatarUrl: "https://i.pravatar.cc/150?5", specialty: "War Photography" },
  { id: 6, name: "Cindy Sherman", avatarUrl: "https://i.pravatar.cc/150?6", specialty: "Conceptual Portraits" },
];

export const exploreCategoryImg: ExploreCategory[] = [
    { id: 1, src: "/Images/Animal.jpg", alt: "Animals" },
    { id: 2, src: "/Images/art.jpg", alt: "Art" },
    { id: 3, src: "/Images/Beauty.jpg", alt: "Beauty" },
    { id: 4, src: "/Images/Design.jpg", alt: "Design" },
    { id: 5, src: "/Images/Abstract.jpg", alt: "Abstract" },
    { id: 6, src: "/Images/Food.jpg", alt: "Food" },
    { id: 7, src: "/Images/House.jpg", alt: "Home" },
    { id: 8, src: "/Images/Fashion.jpg", alt: "Fashion" },
    { id: 9, src: "/Images/Wildlife.jpg", alt: "Wildlife" },
    { id: 10, src: "/Images/Nature.jpg", alt: "Nature" }
];

export const galleryImg: GalleryImage[] = [
  // Photos assigned to Top Photographers
  { id: 2, src: "/Gallery/Misty Peaks.jpg", alt: "Mountain Landscape", name: "Misty Peaks", photographer: "Ansel Adams", category: "nature"},
  { id: 4, src: "/Gallery/Woodland Walk.jpg", alt: "Forest Path", name: "Woodland Walk", photographer: "Ansel Adams", category: "nature" },
  { id: 16, src: "/Gallery/Desert Bloom.jpg", alt: "A flower in the desert", name: "Desert Bloom", photographer: "Ansel Adams", category: "nature" },
  { id: 21, src: "/Gallery/Stray Cat's Gaze.jpg", alt: "A close up of a cat's face", name: "Stray Cat's Gaze", photographer: "Dorothea Lange", category: "animals" },
  { id: 8, src: "/Gallery/Vogue Stance.jpg", alt: "Fashion Model", name: "Vogue Stance", photographer: "Annie Leibovitz", category: "fashion" },
  { id: 15, src: "/Gallery/Golden Hour.jpg", alt: "Model during a sunset", name: "Golden Hour", photographer: "Annie Leibovitz", category: "fashion" },
  { id: 20, src: "/Gallery/Tokyo Streets.jpg", alt: "Busy street in Tokyo at night", name: "Tokyo Streets", photographer: "Steve McCurry", category: "travel" },
  { id: 11, src: "/Gallery/Venetian Canals.jpg", alt: "Canals of Venice", name: "Venetian Canals", photographer: "Steve McCurry", category: "travel" },
  { id: 14, src: "/Gallery/Metropolis Rush.jpg", alt: "Light trails in a city", name: "Metropolis Rush", photographer: "Robert Capa", category: "cityscape" },
  { id: 17, src: "/Gallery/Ink in Water.jpg", alt: "Black ink spreading in water", name: "Ink in Water", photographer: "Cindy Sherman", category: "art" },
  { id: 1, src: "/Gallery/Crimson Flow.jpg", alt: "Abstract Painting", name: "Crimson Flow", photographer: "Cindy Sherman", category: "art"},

  // Other photos
  { id: 3, src: "/Gallery/Urban Glow.jpg", alt: "City at Night", name: "Urban Glow", photographer: "Alex Ray", category: "cityscape" },
  { id: 5, src: "/Gallery/Azure Crash.jpg", alt: "Ocean Waves", name: "Azure Crash", photographer: "Chris Green", category: "nature" },
  { id: 6, src: "/Gallery/Chef's Delight.jpg", alt: "Gourmet Dish", name: "Chef's Delight", photographer: "Mia Brown", category: "food" },
  { id: 7, src: "/Gallery/Glass House.jpg", alt: "Modern Architecture", name: "Glass House", photographer: "Samuel Lee", category: "home" },
  { id: 9, src: "/Gallery/King's Gaze.jpg", alt: "Lion in Savannah", name: "King's Gaze", photographer: "David Kim", category: "wildlife" },
  { id: 10, src: "/Gallery/Cosmic View.jpg", alt: "Starry Night Sky", name: "Cosmic View", photographer: "Rachel Adams", category: "nature" },
  { id: 12, src: "/Gallery/Curious Fox.jpg", alt: "A fox in a field", name: "Curious Fox", photographer: "Emily White", category: "animals" },
  { id: 13, src: "/Gallery/Summer Berries.jpg", alt: "A bowl of fresh berries", name: "Summer Berries", photographer: "Mia Brown", category: "food" },
  { id: 18, src: "/Gallery/Eagle's Soar.jpg", alt: "An eagle flying high", name: "Eagle's Soar", photographer: "David Kim", category: "wildlife" },
  { id: 19, src: "/Gallery/Cozy Corner.jpg", alt: "A cozy reading corner in a home", name: "Cozy Corner", photographer: "Samuel Lee", category: "home" },
  { id: 22, src: "/Gallery/Autumn Falls.jpg", alt: "A waterfall in autumn", name: "Autumn Falls", photographer: "Chris Green", category: "nature" }
];

export const latestShots: LatestShot[] = [
  { id: 1, src: "/shots/latest-1.jpg", alt: "A winding road in the mountains", title: "Mountain Pass" },
  { id: 2, src: "/shots/latest-2.jpg", alt: "A lone deer in a misty forest", title: "Forest Dweller" },
  { id: 3, src: "/shots/latest-3.jpg", alt: "City skyline at sunset", title: "Golden Hour" },
  { id: 4, src: "/shots/latest-4.jpg", alt: "Waves crashing on a rocky shore", title: "Coastal Power" },
];

export const testimonials: Testimonial[] = [
  { id: 1, quote: "Finding the perfect image for my project was so easy. The quality and variety on this site are second to none!", name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: 2, quote: "An incredible collection of photos. I found exactly what I needed in minutes. A fantastic resource for creatives.", name: "Samantha Lee", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
  { id: 3, quote: "The images I sourced from this website have completely elevated our brand's online presence. Absolutely stunning quality!", name: "David Chen", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
];