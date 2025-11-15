import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  structuredData?: object;
}

export default function SEOHead({
  title = 'Pizza Charly Marseille | Pizzeria Artisanale depuis 1962 | Noailles, Le Panier, Opéra',
  description = 'Découvrez Pizza Charly, pizzeria artisanale marseillaise depuis 1962. Pizzas authentiques, ingrédients frais, livraison à domicile. 3 restaurants à Marseille : Noailles, Le Panier et Opéra. Réservation : 09 84 20 79 62',
  canonicalUrl = 'https://pizzacharly.fr',
  ogTitle,
  ogDescription,
  ogImage = 'https://lh3.googleusercontent.com/pw/AP1GczMCCRC_9NYtXy8BHffQlk0hpS4dHOYNPIfyovxbBl2f2EwFp3GACVRZo4YzV-hvHzKuAsAcTcAPcFw2F8W4k-apbD6dTmw5pCoRqIuTfSGei5ZHukRR0LlnlmC_bCl0x-tO0eXro7mlRwlyA6Scymrw=w422-h417-s-no-gm?authuser=0',
  keywords = 'pizza marseille, pizzeria marseille, pizza noailles, pizza le panier, pizza livraison marseille, pizzeria artisanale, restaurant italien marseille, pizza 13001',
  structuredData,
}: SEOHeadProps) {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Pizza Charly" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
