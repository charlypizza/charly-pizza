import { useState, useEffect } from 'react';
import { Instagram as InstagramIcon } from 'lucide-react';
import { client } from '../sanity/client';
import { INSTAGRAM_QUERY } from '../sanity/queries';
import type { Instagram } from '../sanity/types';

export default function InstagramSection() {
  const [instagramData, setInstagramData] = useState<Instagram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramData = async () => {
      try {
        const data = await client.fetch<Instagram>(INSTAGRAM_QUERY);
        setInstagramData(data);
      } catch (error) {
        console.error('Error fetching Instagram data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramData();
  }, []);

  if (loading || !instagramData) {
    return (
      <section className="py-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-gray-900 text-2xl">Chargement...</div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Suivez-nous sur Instagram
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {instagramData.posts.map((post, index) => (
            <a
              key={post._key}
              href={instagramData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={post.image}
                alt={`Instagram post ${index + 1}`}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  post.alwaysColor
                    ? 'filter-none md:grayscale md:group-hover:grayscale-0'
                    : 'filter grayscale group-hover:grayscale-0'
                }`}
              />
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={instagramData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#bd0926] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#9d0720] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <InstagramIcon size={24} />
            Suivez-nous @pizzacharly
          </a>
        </div>
      </div>
    </section>
  );
}