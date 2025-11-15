import { useState, useEffect } from 'react';
import { client } from '../sanity/client';
import { HISTORY_QUERY } from '../sanity/queries';
import type { History } from '../sanity/types';

export default function HistorySection() {
  const [historyData, setHistoryData] = useState<History | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const data = await client.fetch<History>(HISTORY_QUERY);
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  if (loading || !historyData) {
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