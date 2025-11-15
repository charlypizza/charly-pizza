import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Location {
  _id: string;
  _type: 'location';
  name: string;
  address: string;
  image: SanityImage;
  mapUrl: string;
  deliveryUrl?: string;
  clickCollectUrl?: string;
  order: number;
}

export interface MenuItem {
  _key: string;
  name: string;
  description: string;
  price: string;
  image?: SanityImage;
}

export interface MenuCategory {
  _id: string;
  _type: 'menuCategory';
  title: string;
  image: SanityImage;
  items: MenuItem[];
  order: number;
}

export interface GalleryImage {
  _key: string;
  image: SanityImage;
  alt: string;
}

export interface Gallery {
  _id: string;
  _type: 'gallery';
  images: GalleryImage[];
}

export interface InstagramPost {
  _key: string;
  image: SanityImage;
  alwaysColor?: boolean;
}

export interface Instagram {
  _id: string;
  _type: 'instagram';
  profileUrl: string;
  posts: InstagramPost[];
}

export interface HeroSlide {
  _key: string;
  image: SanityImage;
  alt: string;
}

export interface Hero {
  _id: string;
  _type: 'hero';
  title: string;
  subtitle: string;
  tagline: string;
  slides: HeroSlide[];
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface FooterLocation {
  name: string;
  openingHours: OpeningHours[];
}

export interface Footer {
  _id: string;
  _type: 'footer';
  logo: SanityImage;
  tagline: string;
  phone: string;
  locations: FooterLocation[];
  legalMentions: string;
  cgv: string;
  privacyPolicy: string;
  cookieBannerText: string;
  copyrightText: string;
  createdByText: string;
  createdByUrl: string;
}

export interface History {
  _id: string;
  _type: 'history';
  title: string;
  subtitle: string;
  backgroundImage: SanityImage;
}