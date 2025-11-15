import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { client } from '../sanity/client';
import { LOCATIONS_QUERY } from '../sanity/queries';
import type { Location } from '../sanity/types';

export default function DeliverySection() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await client.fetch<Location[]>(LOCATIONS_QUERY);
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <section id="commande" className="bg-[#bd0926] pt-20 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Chargement...</div>
      </section>
    );
  }

  return (
    <section id="commande" className="bg-[#bd0926] pt-20 pb-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Commandez votre pizza
        </h2>
        <p className="text-xl text-white/90 text-center mb-16">Click & Collect ou Livraison</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div
              key={location._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={location.image}
                  alt={`${location.name} - Façade du restaurant pizzeria à Marseille`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg transition-all duration-300 group-hover:bg-[#bd0926] cursor-pointer"
                >
                  <MapPin size={24} className="text-[#bd0926] transition-colors duration-300 group-hover:text-white" />
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{location.name}</h3>
                <p className="text-gray-600 mb-6">{location.address}</p>
                {location.deliveryUrl && location.clickCollectUrl ? (
                  <div className="flex gap-3">
                    <a
                      href={location.deliveryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#bd0926] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#9d0720] transition-all duration-300 hover:scale-105 text-center"
                    >
                      Livraison
                    </a>
                    <a
                      href={location.clickCollectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#bd0926] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#9d0720] transition-all duration-300 hover:scale-105 text-center"
                    >
                      Click & Collect
                    </a>
                  </div>
                ) : location.deliveryUrl ? (
                  <div className="flex justify-center">
                    <a
                      href={location.deliveryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 bg-[#bd0926] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#9d0720] transition-all duration-300 hover:scale-105 text-center"
                    >
                      Livraison
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}