import { useState, useEffect } from 'react';
import { Phone, X, Heart } from 'lucide-react';
import { client } from '../sanity/client';
import { FOOTER_QUERY } from '../sanity/queries';
import type { Footer as FooterType } from '../sanity/types';

type ModalType = 'mentions' | 'cgv' | 'confidentialite' | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [footerData, setFooterData] = useState<FooterType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await client.fetch<FooterType>(FOOTER_QUERY);
        setFooterData(data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading || !footerData) {
    return (
      <footer id="contact" className="bg-[#bd0926] text-white py-12 min-h-[400px] flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </footer>
    );
  }

  const modalContent = {
    mentions: {
      title: 'Mentions Légales',
      content: footerData.legalMentions,
    },
    cgv: {
      title: 'Conditions Générales de Vente',
      content: footerData.cgv,
    },
    confidentialite: {
      title: 'Politique de Confidentialité',
      content: footerData.privacyPolicy,
    },
  };

  return (
    <>
      <footer id="contact" className="bg-[#bd0926] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={footerData.logo}
                alt="Pizza Charly"
                className="h-40 w-auto"
              />
              <p className="mt-3 text-base opacity-80 italic">
                {footerData.tagline}
              </p>
              <div className="mt-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 text-base">
                  <Phone size={20} />
                  <span>{footerData.phone}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="space-y-3 text-base">
                {footerData.locations.map((location, index) => (
                  <div key={index}>
                    <h5 className="font-semibold mb-2">{location.name}</h5>
                    {location.openingHours.map((hours, hoursIndex) => (
                      <p key={hoursIndex} className="opacity-90">
                        {hours.days} : {hours.hours}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-base font-semibold mb-4">Informations</h4>
              <div className="space-y-2 text-base">
                <button
                  onClick={() => setActiveModal('mentions')}
                  className="block w-full md:w-auto md:ml-auto hover:opacity-70 transition-opacity duration-300"
                >
                  Mentions légales
                </button>
                <button
                  onClick={() => setActiveModal('cgv')}
                  className="block w-full md:w-auto md:ml-auto hover:opacity-70 transition-opacity duration-300"
                >
                  CGV
                </button>
                <button
                  onClick={() => setActiveModal('confidentialite')}
                  className="block w-full md:w-auto md:ml-auto hover:opacity-70 transition-opacity duration-300"
                >
                  Politique de confidentialité
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-4">
            <p>{footerData.copyrightText}</p>
            <a
              href={footerData.createdByUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
            >
              {footerData.createdByText} <Heart size={16} className="fill-white" />
            </a>
          </div>
        </div>
      </footer>

      {activeModal && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="sticky top-4 right-4 float-right bg-[#bd0926] text-white p-2 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110"
            >
              <X size={24} />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#bd0926] mb-6">
                {modalContent[activeModal].title}
              </h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {modalContent[activeModal].content}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 bg-[#bd0926] text-white py-4 px-6 rounded-2xl z-40 shadow-2xl md:max-w-sm animate-slideUp">
          <button
            onClick={() => setShowCookieBanner(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <p className="text-sm mb-4 pr-4">
            {footerData.cookieBannerText}
          </p>
          <button
            onClick={() => setShowCookieBanner(false)}
            className="w-full bg-white text-[#bd0926] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            J'accepte
          </button>
        </div>
      )}
    </>
  );
}