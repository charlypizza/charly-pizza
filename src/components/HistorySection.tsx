import { useState, useEffect } from 'react';
import { client } from '../sanity/client';
import { HISTORY_QUERY } from '../sanity/queries';
import type { History } from '../sanity/types';

// Static fallback data
const fallbackData = {
  _id: '1',
  _type: 'history' as const,
  title: 'Pizza Charly, née en 1962, au cœur du Vieux Port.',
  subtitle: 'Un héritage marseillais transmis, réinventé, partagé.',
  backgroundImage: 'https://lh3.googleusercontent.com/pw/AP1GczNrROlXCZ1RkkgGs2NOFfeCYJRUbM2MNpeCB_S_tuCXpcD-zLsGGdlOWWuVUfMD5XGY0CbjTUk4hIvFn-tFyx_loEvwU3V90b8UiArk93v8RblG86vnlBkUu62HoFucITc6A84l9j2dqGkezLnkgPw=w2940-h706-s-no-gm?authuser=0',
};

export default function HistorySection() {
  const [historyData, setHistoryData] = useState<History>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const data = await client.fetch<History>(HISTORY_QUERY);
        if (data && data.title && data.backgroundImage) {
          setHistoryData(data);
        } else {
          console.log('No history data found, using fallback');
        }
      } catch (error) {
        console.error('Error fetching history data:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  if (loading) {
    return (
      <section id="histoire" className="relative w-full overflow-hidden z-10 h-64 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Chargement...</div>
      </section>
    );
  }

  return (
    <section id="histoire" className="relative w-full overflow-hidden z-10">
      <div className="relative w-full">
        <img
          src={historyData.backgroundImage}
          alt="Histoire Pizza Charly"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h2 className="text-white text-sm md:text-4xl font-bold text-center mb-1 md:mb-4 animate-fadeInUp">
          {historyData.title}
        </h2>
        <p
          className="text-white text-xs md:text-2xl text-center font-light animate-fadeInUp"
          style={{ animationDelay: '300ms' }}
        >
          {historyData.subtitle}
        </p>
      </div>
    </section>
  );
}