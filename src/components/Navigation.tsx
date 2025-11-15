import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { client } from '../sanity/client';
import { FOOTER_QUERY } from '../sanity/queries';
import type { Footer } from '../sanity/types';

interface NavigationProps {
  onMenuClick: (section: string) => void;
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState<string>('https://lh3.googleusercontent.com/pw/AP1GczMCCRC_9NYtXy8BHffQlk0hpS4dHOYNPIfyovxbBl2f2EwFp3GACVRZo4YzV-hvHzKuAsAcTcAPcFw2F8W4k-apbD6dTmw5pCoRqIuTfSGei5ZHukRR0LlnlmC_bCl0x-tO0eXro7mlRwlyA6Scymrw=w422-h417-s-no-gm?authuser=0');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const data = await client.fetch<Footer>(FOOTER_QUERY);
        if (data?.logo) {
          setLogo(data.logo);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
        // Keep default logo on error
      }
    };

    fetchLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Menu', id: 'menu' },
    { label: 'Commander', id: 'commande' },
    { label: 'Histoire', id: 'histoire' },
    { label: 'Galerie', id: 'galerie' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#bd0926]' : 'bg-[#bd0926]/0'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onMenuClick('commande')}
            className="md:bg-white md:text-[#bd0926] text-white rounded-full font-semibold md:hover:bg-gray-100 transition-all duration-300 hover:scale-105 md:px-6 md:py-2 flex items-center justify-center"
          >
            <span className="hidden md:inline">Commander</span>
            <ShoppingBag size={28} className="md:hidden" />
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute left-1/2 transform -translate-x-1/2 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={logo}
              alt="Pizza Charly"
              className="h-12 md:h-16 w-auto"
            />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:scale-110 transition-transform duration-300"
          >
            {isMenuOpen ? (
              <X size={32} />
            ) : (
              <div className="flex flex-col items-end gap-1.5">
                <div className="w-8 h-0.5 bg-white transition-all duration-300"></div>
                <div className="w-6 h-0.5 bg-white transition-all duration-300"></div>
                <div className="w-4 h-0.5 bg-white transition-all duration-300"></div>
              </div>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-[#bd0926] z-40 transition-all duration-500 flex items-center justify-center ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="text-center">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                onMenuClick(item.id);
                setIsMenuOpen(false);
              }}
              className="block text-white text-4xl md:text-5xl font-bold mb-8 hover:scale-110 transition-all duration-300 opacity-0 animate-fadeInUp mx-auto"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}