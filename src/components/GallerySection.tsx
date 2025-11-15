import { useState, useEffect } from 'react';
import { client } from '../sanity/client';
import { GALLERY_QUERY } from '../sanity/queries';
import type { Gallery } from '../sanity/types';

export default function GallerySection() {
  const [galleryData, setGalleryData] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const data = await client.fetch<Gallery>(GALLERY_QUERY);
        setGalleryData(data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const handleImageClick = () => {
    window.open('https://www.instagram.com/charlypizzamarseille/', '_blank');
  };

  if (loading || !galleryData) {
    return (
      <section id="galerie" className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Chargement de la galerie...</div>
      </section>
    );
  }

  const images = galleryData.images;

  return (
    <section id="galerie" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <div
          className="relative overflow-hidden cursor-pointer group md:col-span-2 h-[400px] md:h-[600px]"
          onClick={handleImageClick}
        >
          <img
            src={images[0]?.image}
            alt={images[0]?.alt}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
        </div>

        <div className="grid grid-cols-2 gap-0 md:col-span-1">
          {images.slice(1, 5).map((image) => (
            <div
              key={image._key}
              className="relative overflow-hidden cursor-pointer group h-[200px] md:h-[300px]"
              onClick={handleImageClick}
            >
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-0 md:col-span-1 order-last md:order-none">
          {images.slice(5, 9).map((image) => (
            <div
              key={image._key}
              className="relative overflow-hidden cursor-pointer group h-[200px] md:h-[300px]"
              onClick={handleImageClick}
            >
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div
          className="relative overflow-hidden cursor-pointer group md:col-span-2 h-[400px] md:h-[600px]"
          onClick={handleImageClick}
        >
          <img
            src={images[9]?.image}
            alt={images[9]?.alt}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
        </div>
      </div>
    </section>
  );
}