import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '../sanity/client';
import { MENU_QUERY } from '../sanity/queries';
import type { MenuCategory, MenuItem } from '../sanity/types';

// Static fallback menu data (subset for brevity)
const fallbackMenuData: MenuCategory[] = [
  {
    _id: '1',
    _type: 'menuCategory',
    title: 'Pizzas - Créations',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOZKqY1hDn0Fsqr5VtDY2Dqi4XDA9nxLyR6tRr1kvfBhr9tLMhTF8MiDgy7GWFeVlT6VTQ1q82t9WKQk32ELaggquZFQxZsaW1sn64slbHCoToJ0TbDiuuMzLWCJn70tG6prUGCsebkVK2zVAHB10F_=w1001-h1494-s-no-gm?authuser=0',
    order: 0,
    items: [
      { _key: '1', name: 'Pizza Chorizo', description: 'Sauce tomate maison, emmental, préparation de viande de bœuf et piment, olives noires et herbes.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPfnT0singy0lbr09dedRiQOqyY55bAJZQtt-jUGqdfm_2O5QLxbUR6hj-ue8VbrC9rFy9BuoboyWm6VWGTWbSMMiYTi26OIV-YGj-dEwoainRAeanMLd8SqJS4rKZfwL22cp7XJ99kqTM1T_Crrq2y=w1172-h1080-s-no-gm?authuser=0' },
      { _key: '2', name: 'BBQ', description: 'Sauce tomate préparé maison, emmental, olives noires, herbes, spécialité au bœuf, poivrons, oignon, coriandre, menthe et sauce BBQ.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczN3g5PEt86sx9wJatnvBA5MEi1N3z__S7q4dk-5ljwFKfIAfxb8dq54bE0UA6tm4Y9vbSi8WZOXu32R5PmM8P_AbUujRtUqLYSUc9TEgfyYkBa6Zkd215gtgJVxBvPM7efSG3x9ZSuGNjVdVF-DiYc4=w1178-h1086-s-no-gm?authuser=0' },
    ],
  },
  {
    _id: '2',
    _type: 'menuCategory',
    title: 'Pizzas - Base tomate',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOgqwgYIvGn1PpOa06IiSC1TGbQo_dUoBQMYnpmuSlesEpzr8oDTLRd4GR03pgkk2KXHmdbOuy5l9RPB-4yqCFSA7nyCYQeB6wt9uWFaqNaYJ4Q_gIY4js6C8vJYlpHEqXov5PoPb1bIYybGruUilm_=w1179-h1457-s-no-gm?authuser=0',
    order: 1,
    items: [
      { _key: '3', name: 'Arménienne', description: 'Sauce tomate maison. emmental, préparation de viande de bœuf, poivrons, coriandre, menthe, olives noires, herbes.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczM5TLAz4b011tFemghSXDgY7jZiMwcKcZd3cAMNXTnM5qrrbfU9pN-TNEdDN0Lm2e9gYxEb8XBDaNAxJv0B2WygygzQGrD5KqP_OkMwJtb6QgVHm-kp1_gH-z7LG4WPN0CZxrbVIW0BT_PwAi2--hOj=w1178-h1090-s-no-gm?authuser=0' },
      { _key: '4', name: '4 Fromages', description: 'Sauce tomate maison, emmental, roquefort, mozzarella, chèvre, olives noires, herbes.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPxkVbYMmmgd7174smgW0WdwgVvRckhNKyZPoRQvA6qnwlOhoNnAMIxxw4j9zF0Sl-HxtBfVxNTyeAq2bax0trbdY3MWxSaTUuojiXB5-VDyVeZrLme-soZkpmIbvpH3FV5JmwOq7wnBwGdW_hzzqQu=w1182-h1098-s-no-gm?authuser=0' },
    ],
  },
  {
    _id: '3',
    _type: 'menuCategory',
    title: 'Pizzas - Base crème',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPFVcFu6ZZ73ZuNBX82eOTFHSxGL54ygKEIVbjVbPGFaklxJJk6P1eebNal4pQC4Q9YEhfzRK22Hrv5vyYgWUd1lOCElEORD0w2Q08f_6ama7syFEuotSvC_Ob5RIFKiiBq_wEY-pwQCCEK5Q6_nZ-W=w1179-h1236-s-no-gm?authuser=0',
    order: 2,
    items: [
      { _key: '5', name: 'Poulet crème', description: 'Spécialité de crème, emmental, poulet haché, persil, oignon, épices, olives noires, herbes.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczMPsTJlWx6wLEq61fPFj4a6TcQsi4SWPLP5CO4wVM806_BspAKHpRnskHLdMBx8H8Kt7MFwc3AHjqaS3qKQTG21Et8pYtQfxs77_yf1Qw1xv9CUwsAzIn2vtVUDe18Y5xyzywY93HO09h5fDlG1a3Pl=w1176-h1098-s-no-gm?authuser=0' },
      { _key: '6', name: 'Royale crème', description: 'Spécialité de crème, emmental, jambon de dinde de qualité supérieure et champignons préparé maison, olives noires, herbes.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczMLkX904jy0jDTPOB82zU20P3Mg9LlDGvvl0_EL8KlyznUzGGnicpsPfo_rwd5vSmrTwOxihhcMw2nZFm5vhgSOdaRTjomUy1a6BbV7HTK4IcNmv7lT6GvPZ_IKskItEBbUB7ACdCFpLMjRx9mjEMwg=w1180-h1102-s-no-gm?authuser=0' },
    ],
  },
];

export default function MenuSection() {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<boolean[]>([]);
  const [menuData, setMenuData] = useState<MenuCategory[]>(fallbackMenuData);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const selectedMenu = selectedMenuIndex !== null ? menuData[selectedMenuIndex] : null;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await client.fetch<MenuCategory[]>(MENU_QUERY);
        if (data && data.length > 0) {
          setMenuData(data);
          setVisibleColumns(new Array(data.length).fill(false));
        } else {
          console.log('No menu data found, using fallback');
          setVisibleColumns(new Array(fallbackMenuData.length).fill(false));
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
        setVisibleColumns(new Array(fallbackMenuData.length).fill(false));
        // Keep fallback data
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
        <div className="text-white text-2xl"></div>
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