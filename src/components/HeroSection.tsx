import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { client } from '../sanity/client';
import { HERO_QUERY } from '../sanity/queries';
import type { Hero } from '../sanity/types';

// Static fallback data
const fallbackData = {
  title: 'Pizza Charly',
  subtitle: 'Trois lieux, une même passion.',
  tagline: 'Depuis 1962, Marseille a sa pizza.',
  slides: [
    {
      _key: '1',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczPz-y-4dVprD-3CCSXSi8OjZGUpTspYU4Bbhv0h8lQ4EjNf_qWS3kyIfrVlf2wXVLYjaEZ2t0w41_5B3CVb5jkAjOBCf-ey3G3WhAMDwDk2KBZ0Dkf8ABX9zt_ytlHT0ej3jz-_ddoPtM36hCvR_OSn=w1920-h1280-s-no-gm?authuser=0',
      alt: 'Pizza artisanale cuite au feu de bois chez Pizza Charly Marseille',
    },
    {
      _key: '2',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczNSIqdaHuhVKRkpeQNiiVAyKEzVHc26o5N1Qc7EYeGR1lFj-yCrTEnsokOsphuBm2SB_YMLebwAe6a_veZX9wfq7EfZxy5PfgyoIZ2oIzNSL-eX6HeH1YdNcSFlJhgekvZiYS2DyTSHsBdxUtflUVPE=w1202-h1602-s-no-gm?authuser=0',
      alt: 'Pizza margherita fraîchement préparée - Pizza Charly',
    },
    {
      _key: '3',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczPzRtEWsCvA3kvrPe5yWVY1yptz8lyLVqBXY0-lntABTK9BVUBpCZWgqFU6G-3hGjQwL2bxGXZ8oUTzFRMslra3xI1xV0qVJHnnj1rspwFFjnmEdR-HWJLe2amiy2O6SQ2b4Ut7djPZp4Yn6eE0qJVk=w1068-h1602-s-no-gm?authuser=0',
      alt: 'Pizza italienne authentique avec ingrédients frais - Pizzeria Marseille',
    },
  ],
};

interface HeroSectionProps {
  onScroll: () => void;
}

export default function HeroSection({ onScroll }: HeroSectionProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [heroData, setHeroData] = useState<Hero>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await client.fetch<Hero>(HERO_QUERY);
        if (data && data.slides && data.slides.length > 0) {
          setHeroData(data);
        } else {
          console.log('No hero data found, using fallback');
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    if (!heroData?.slides) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroData.slides.length);
    }, 5000);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowButtons(true);
      } else if (window.scrollY === 0) {
        setShowButtons(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroData]);

  

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {heroData.slides.map((slide, index) => (
        <div
          key={slide._key}
          className={`absolute inset-0 transition-opacity duration-1500 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover scale-105 animate-zoomSlow"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 animate-fadeInUp">
          {heroData.title}
        </h1>
        <p className="text-2xl md:text-3xl text-center mb-2 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          {heroData.subtitle}
        </p>
        <p className="text-lg md:text-xl text-center opacity-90 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          {heroData.tagline}
        </p>

        <div
          className={`flex gap-4 mt-24 transition-all duration-700 ${
            showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="#commande"
            className="bg-[#bd0926] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#9d0720] transition-all duration-300 hover:scale-105 shadow-lg inline-block"
            aria-label="Commander des pizzas Pizza Charly"
          >
            Commander
          </a>
          <button
            onClick={onScroll}
            className="bg-white text-[#bd0926] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            aria-label="Voir le menu des pizzas"
          >
            Voir le menu
          </button>
        </div>
      </div>

      <button
        onClick={onScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white z-10 animate-bounce"
      >
        <ChevronDown size={40} />
      </button>

      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {heroData.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}