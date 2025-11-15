import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { client } from '../sanity/client';
import { LOCATIONS_QUERY } from '../sanity/queries';
import type { Location } from '../sanity/types';

// Static fallback data
const fallbackLocations = [
  {
    _id: '1',
    _type: 'location' as const,
    name: 'Pizza Charly - Noailles',
    address: '24 Rue des Feuillants, 13001 Marseille',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMCMcZlP6VG9mW4QD6aiRgI0DcyXCmuMIUuITHdjtCTthebiiFeop1TjVmCaRxkd72ep6w_C6dTcpqtOhMJweYC24fHheH48USFi9eFAfFTgqoN_bosllH9Q044l1OOW7Ux2_f-BF3ckh5zkZUmG4zg=w1179-h1465-s-no-gm?authuser=0',
    mapUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12c9c1ff91a737c1:0x3345dd41b7f27e53?sa=X&ved=1t:8290&ictx=111',
    deliveryUrl: 'https://pizzacharly.fr/order/?type=delivery',
    order: 0,
  },
  {
    _id: '2',
    _type: 'location' as const,
    name: 'Pizza Charly - Le Panier',
    address: '36 Grand Rue, 13002 Marseille',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPSvmvJ8Fz9oFjFE-_mvWj49PUGbCz3BRKU39ouc2nA4u3lZxd29eKBPwbXAHco1MvcsmIJPw5Iu4nI8BoDWNRKCNwWlCDOZSGvbDWDmtjgev0DUDHLpys4XFAZ7GUO_K9L3Xdk_XgXzS2SknoMp6ri=w1017-h1113-s-no-gm?authuser=0',
    mapUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12c9c1006e176963:0xdd38ffa50a0b943?sa=X&ved=1t:8290&ictx=111',
    deliveryUrl: 'https://pizzacharly.fr/order/?type=delivery',
    clickCollectUrl: 'https://pizzacharly.fr/order/?type=pickup',
    order: 1,
  },
  {
    _id: '3',
    _type: 'location' as const,
    name: 'Pizza Charly - Opéra',
    address: '7 Pl. Général de Gaulle, 13001 Marseille',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNJMD1sz_llOAyIRhTWku6fEBEBhZ561FmbDqf7biTV1c4h8xt37aedXKnfNkz0ql6SomPXvu6RIFT9-XvV0K0jYrT3u_Euh82WPS1RVEEKK7z5h3Q8xmOvA779-vd5jFFWUkW9oIkGD1tohJaoaN0e=w1172-h1075-s-no-gm?authuser=0',
    mapUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x12c9c174a8e83295:0x8fc77e9bbca3dd19?sa=X&ved=1t:8290&ictx=111',
    deliveryUrl: 'https://pizzacharly.fr/order/?type=delivery',
    order: 2,
  },
];

export default function DeliverySection() {
  const [locations, setLocations] = useState<Location[]>(fallbackLocations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await client.fetch<Location[]>(LOCATIONS_QUERY);
        if (data && data.length > 0) {
          setLocations(data);
        } else {
          console.log('No locations found, using fallback');
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <section id="commande" className="bg-[#bd0926] pt-20 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl"></div>
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