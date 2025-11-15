import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '../sanity/client';
import { MENU_QUERY } from '../sanity/queries';
import type { MenuCategory } from '../sanity/types';

export default function MenuSection() {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<boolean[]>([]);
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const selectedMenu = selectedMenuIndex !== null ? menuData[selectedMenuIndex] : null;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await client.fetch<MenuCategory[]>(MENU_QUERY);
        setMenuData(data);
        setVisibleColumns(new Array(data.length).fill(false));
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handlePrevious = () => {
    if (selectedMenuIndex !== null) {
      const newIndex = selectedMenuIndex === 0 ? menuData.length - 1 : selectedMenuIndex - 1;
      setSelectedMenuIndex(newIndex);
      setTimeout(() => {
        modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  const handleNext = () => {
    if (selectedMenuIndex !== null) {
      const newIndex = selectedMenuIndex === menuData.length - 1 ? 0 : selectedMenuIndex + 1;
      setSelectedMenuIndex(newIndex);
      setTimeout(() => {
        modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            menuData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleColumns((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [menuData]);

  if (loading) {
    return (
      <section id="menu" className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-2xl">Chargement du menu...</div>
      </section>
    );
  }

  return (
    <section id="menu" ref={sectionRef} className="min-h-screen">
      <h2 className="sr-only">Notre Menu de Pizzas Artisanales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        {menuData.map((category, index) => (
          <div
            key={category._id}
            className={`relative h-full overflow-hidden cursor-pointer group transition-all duration-700 ${
              visibleColumns[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
            onClick={() => setSelectedMenuIndex(index)}
          >
            <img
              src={category.image}
              alt={`Menu ${category.title} - Pizza Charly Marseille`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl md:text-4xl font-bold text-center px-4 transform group-hover:scale-110 transition-transform duration-500">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMenu && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedMenuIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-[#bd0926] text-white p-2 md:p-3 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft size={24} className="md:hidden" />
            <ChevronLeft size={32} className="hidden md:block" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-[#bd0926] text-white p-2 md:p-3 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight size={24} className="md:hidden" />
            <ChevronRight size={32} className="hidden md:block" />
          </button>

          <div
            ref={modalContentRef}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMenuIndex(null)}
              className="sticky top-4 right-4 float-right bg-[#bd0926] text-white p-2 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110 z-10"
            >
              <X size={24} />
            </button>
            <div className="p-8">
              <h2 className="text-4xl font-bold text-[#bd0926] mb-8 text-center">{selectedMenu.title}</h2>
              <div className="space-y-6">
                {selectedMenu.items.map((item) => (
                  <div
                    key={item._key}
                    className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded transition-colors duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {item.image && (
                        <div className="flex-shrink-0 w-full md:w-24 h-48 md:h-24 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={`Pizza ${item.name} - ${item.description.substring(0, 50)}...`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{item.name}</h4>
                          <span className="text-xl font-bold text-[#bd0926] ml-4">{item.price}</span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}