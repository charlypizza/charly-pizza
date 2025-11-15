import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import DeliverySection from './components/DeliverySection';
import HistorySection from './components/HistorySection';
import GallerySection from './components/GallerySection';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { generateRestaurantSchema, generateFAQSchema, generateBreadcrumbSchema } from './utils/structuredData';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const restaurantSchema = generateRestaurantSchema();
  const faqSchema = generateFAQSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: 'https://pizzacharly.fr' },
    { name: 'Menu', url: 'https://pizzacharly.fr#menu' },
    { name: 'Livraison', url: 'https://pizzacharly.fr#livraison' },
    { name: 'Notre Histoire', url: 'https://pizzacharly.fr#histoire' },
    { name: 'Contact', url: 'https://pizzacharly.fr#contact' },
  ]);

  const combinedStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [restaurantSchema, faqSchema, breadcrumbSchema],
  };

  return (
    <>
      <SEOHead structuredData={combinedStructuredData} />
      <div className="min-h-screen bg-white">
        <Navigation onMenuClick={scrollToSection} />
        <HeroSection onScroll={() => scrollToSection('menu')} />
        <MenuSection />
        <DeliverySection />
        <HistorySection />
        <GallerySection />
        <InstagramSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
