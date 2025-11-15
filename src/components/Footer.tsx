import { useState, useEffect } from 'react';
import { Phone, X, Heart } from 'lucide-react';
import { client } from '../sanity/client';
import { FOOTER_QUERY } from '../sanity/queries';
import type { Footer as FooterType } from '../sanity/types';

type ModalType = 'mentions' | 'cgv' | 'confidentialite' | null;

// Static fallback data
const fallbackFooterData: FooterType = {
  _id: '1',
  _type: 'footer',
  logo: 'https://lh3.googleusercontent.com/pw/AP1GczMCCRC_9NYtXy8BHffQlk0hpS4dHOYNPIfyovxbBl2f2EwFp3GACVRZo4YzV-hvHzKuAsAcTcAPcFw2F8W4k-apbD6dTmw5pCoRqIuTfSGei5ZHukRR0LlnlmC_bCl0x-tO0eXro7mlRwlyA6Scymrw=w422-h417-s-no-gm?authuser=0',
  tagline: 'Depuis 1962, l\'histoire continue.',
  phone: '+33 9 84 20 79 62',
  locations: [
    {
      name: 'Pizza Charly - Noailles',
      openingHours: [
        { days: 'Lun-Ven', hours: '09h-23h' },
        { days: 'Sam', hours: '09h-21h' },
        { days: 'Dim', hours: 'Fermé' },
      ],
    },
    {
      name: 'Pizza Charly - Le Panier',
      openingHours: [
        { days: 'Tous les jours', hours: '09h-22h' },
      ],
    },
    {
      name: 'Pizza Charly - Opéra',
      openingHours: [
        { days: 'Lun-Jeu', hours: '09h-23h' },
        { days: 'Ven-Sam', hours: '09h-00h' },
        { days: 'Dim', hours: 'Fermé' },
      ],
    },
  ],
  legalMentions: `INFORMATIONS GÉNÉRALES

Raison sociale : Pizza Charly
Siège social : Marseille, France

DIRECTEUR DE PUBLICATION

Le directeur de publication du site est le représentant légal de Pizza Charly.

HÉBERGEMENT

Ce site est hébergé par un prestataire professionnel répondant aux normes de sécurité et de confidentialité en vigueur.

PROPRIÉTÉ INTELLECTUELLE

L'ensemble des contenus présents sur ce site (textes, images, photographies, logos, vidéos) sont la propriété exclusive de Pizza Charly ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation totale ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Pizza Charly.

COOKIES

Ce site utilise des cookies pour améliorer l'expérience utilisateur. En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.

LIENS HYPERTEXTES

Les liens hypertextes présents sur le site Pizza Charly orientant les utilisateurs vers d'autres sites internet n'engagent pas la responsabilité de Pizza Charly quant au contenu de ces sites.

LITIGES

Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français compétents.`,
  cgv: `PRÉAMBULE

Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Pizza Charly et toute personne physique ou morale souhaitant effectuer un achat (ci-après "le Client").

ARTICLE 1 - CHAMP D'APPLICATION

Les présentes CGV s'appliquent à toutes les ventes de produits alimentaires et boissons réalisées par Pizza Charly, que ce soit sur place, à emporter ou en livraison. Le fait de passer commande implique l'acceptation sans réserve des présentes CGV.

ARTICLE 2 - PRODUITS ET SERVICES

Pizza Charly propose une gamme de pizzas artisanales, de produits italiens et de boissons. Les photographies et descriptions des produits sont fournies à titre indicatif et peuvent varier légèrement. Pizza Charly s'engage à respecter les recettes traditionnelles et à utiliser des ingrédients de qualité.`,
  privacyPolicy: `PRÉAMBULE

Pizza Charly accorde une grande importance à la protection de vos données personnelles. La présente politique de confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons et protégeons vos données conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.

1. RESPONSABLE DU TRAITEMENT DES DONNÉES

Pizza Charly est responsable du traitement de vos données personnelles.`,
  cookieBannerText: 'Ce site utilise des cookies pour améliorer votre expérience. En continuant votre navigation, vous acceptez leur utilisation.',
  copyrightText: '© 2025 Pizza Charly. Tous droits réservés.',
  createdByText: 'Created with',
  createdByUrl: 'https://www.vasseo.com/',
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [footerData, setFooterData] = useState<FooterType>(fallbackFooterData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await client.fetch<FooterType>(FOOTER_QUERY);
        if (data && data.logo) {
          setFooterData(data);
        } else {
          console.log('No footer data found, using fallback');
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
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