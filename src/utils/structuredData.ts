interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  openingHours: Array<{
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  postalCode: string;
}

export function generateRestaurantSchema(location?: Location) {
  const defaultLocation = {
    name: 'Pizza Charly - Opéra',
    address: '7 Place Général de Gaulle',
    latitude: 43.2965,
    longitude: 5.3698,
    phone: '+33984207962',
    postalCode: '13001',
    openingHours: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '23:00',
      },
      {
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '09:00',
        closes: '00:00',
      },
    ],
  };

  const loc = location || defaultLocation;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': 'https://pizzacharly.fr',
    name: 'Pizza Charly',
    image: [
      'https://lh3.googleusercontent.com/pw/AP1GczMCCRC_9NYtXy8BHffQlk0hpS4dHOYNPIfyovxbBl2f2EwFp3GACVRZo4YzV-hvHzKuAsAcTcAPcFw2F8W4k-apbD6dTmw5pCoRqIuTfSGei5ZHukRR0LlnlmC_bCl0x-tO0eXro7mlRwlyA6Scymrw=w422-h417-s-no-gm?authuser=0',
    ],
    url: 'https://pizzacharly.fr',
    telephone: loc.phone,
    priceRange: '€€',
    servesCuisine: ['Italian', 'Pizza', 'Mediterranean'],
    foundingDate: '1962',
    slogan: 'Depuis 1962, l\'histoire continue',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: 'Marseille',
      postalCode: loc.postalCode,
      addressCountry: 'FR',
      addressRegion: 'Provence-Alpes-Côte d\'Azur',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.latitude,
      longitude: loc.longitude,
    },
    openingHoursSpecification: loc.openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: ['https://www.instagram.com/pizzacharly.officiel/'],
    hasMenu: 'https://pizzacharly.fr#menu',
    acceptsReservations: 'True',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'EUR',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
      bestRating: '5',
      worstRating: '1',
    },
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://pizzacharly.fr#commande',
        inLanguage: 'fr',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      deliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModePickup', 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet'],
    },
  };
}

export function generateLocalBusinessSchema(locations: Location[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pizza Charly',
    url: 'https://pizzacharly.fr',
    logo: 'https://lh3.googleusercontent.com/pw/AP1GczMCCRC_9NYtXy8BHffQlk0hpS4dHOYNPIfyovxbBl2f2EwFp3GACVRZo4YzV-hvHzKuAsAcTcAPcFw2F8W4k-apbD6dTmw5pCoRqIuTfSGei5ZHukRR0LlnlmC_bCl0x-tO0eXro7mlRwlyA6Scymrw=w422-h417-s-no-gm?authuser=0',
    foundingDate: '1962',
    description: 'Pizzeria artisanale marseillaise depuis 1962. Trois restaurants à Marseille proposant des pizzas authentiques préparées avec des ingrédients frais.',
    telephone: '+33984207962',
    sameAs: ['https://www.instagram.com/pizzacharly.officiel/'],
    location: locations.map((loc) => ({
      '@type': 'Restaurant',
      name: `Pizza Charly - ${loc.name}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address,
        addressLocality: 'Marseille',
        postalCode: loc.postalCode,
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
      telephone: loc.phone,
      priceRange: '€€',
      servesCuisine: 'Italian',
      openingHoursSpecification: loc.openingHours.map((hours) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.dayOfWeek,
        opens: hours.opens,
        closes: hours.closes,
      })),
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateMenuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Menu Pizza Charly',
    description: 'Notre sélection de pizzas artisanales préparées avec des ingrédients frais et de qualité',
    inLanguage: 'fr',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Pizzas - Base tomate',
        description: 'Nos pizzas traditionnelles sur base de sauce tomate maison',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Pizza Margherita',
            description: 'Sauce tomate maison, mozzarella, basilic frais',
            offers: {
              '@type': 'Offer',
              price: '11.00',
              priceCurrency: 'EUR',
            },
          },
          {
            '@type': 'MenuItem',
            name: 'Pizza 4 Fromages',
            description: 'Sauce tomate, emmental, roquefort, mozzarella, chèvre',
            offers: {
              '@type': 'Offer',
              price: '11.00',
              priceCurrency: 'EUR',
            },
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Pizzas - Base crème',
        description: 'Nos pizzas gourmandes sur base de crème fraîche',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Pizza Royale Crème',
            description: 'Crème fraîche, emmental, jambon, champignons',
            offers: {
              '@type': 'Offer',
              price: '13.00',
              priceCurrency: 'EUR',
            },
          },
        ],
      },
    ],
  };
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Où se trouvent les restaurants Pizza Charly à Marseille ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pizza Charly dispose de 3 restaurants à Marseille : à l\'Opéra (7 Place Général de Gaulle, 13001), au Panier (36 Grand Rue, 13002) et à Noailles (24 Rue des Feuillants, 13001).',
        },
      },
      {
        '@type': 'Question',
        name: 'Quels sont les horaires d\'ouverture de Pizza Charly ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les horaires varient selon les restaurants. Opéra : Lun-Jeu 9h-23h, Ven-Sam 9h-00h. Le Panier : Tous les jours 9h-22h. Noailles : Lun-Ven 9h-23h, Sam 9h-21h. Fermé le dimanche pour certains restaurants.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pizza Charly propose-t-il la livraison à domicile ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, Pizza Charly propose un service de livraison à domicile dans un rayon de 5 kilomètres autour de chaque restaurant à Marseille.',
        },
      },
      {
        '@type': 'Question',
        name: 'Depuis quand Pizza Charly existe-t-il ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pizza Charly est une institution marseillaise depuis 1962, soit plus de 60 ans d\'expérience dans la préparation de pizzas artisanales.',
        },
      },
      {
        '@type': 'Question',
        name: 'Peut-on réserver une table chez Pizza Charly ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, les réservations sont possibles par téléphone au 09 84 20 79 62 pour tous nos restaurants.',
        },
      },
    ],
  };
}
