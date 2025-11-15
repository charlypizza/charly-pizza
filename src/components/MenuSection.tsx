import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
}

interface MenuCategory {
  title: string;
  image: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    title: 'Pizzas - Créations',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOZKqY1hDn0Fsqr5VtDY2Dqi4XDA9nxLyR6tRr1kvfBhr9tLMhTF8MiDgy7GWFeVlT6VTQ1q82t9WKQk32ELaggquZFQxZsaW1sn64slbHCoToJ0TbDiuuMzLWCJn70tG6prUGCsebkVK2zVAHB10F_=w1001-h1494-s-no-gm?authuser=0',
    items: [
      { name: 'Pizza Chorizo', description: 'Sauce tomate maison, emmental, préparation de viande de bœuf et piment, olives noires et herbes.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPfnT0singy0lbr09dedRiQOqyY55bAJZQtt-jUGqdfm_2O5QLxbUR6hj-ue8VbrC9rFy9BuoboyWm6VWGTWbSMMiYTi26OIV-YGj-dEwoainRAeanMLd8SqJS4rKZfwL22cp7XJ99kqTM1T_Crrq2y=w1172-h1080-s-no-gm?authuser=0' },
      { name: 'BBQ', description: 'Sauce tomate préparé maison, emmental, olives noires, herbes, spécialité au bœuf, poivrons, oignon, coriandre, menthe et sauce BBQ.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczN3g5PEt86sx9wJatnvBA5MEi1N3z__S7q4dk-5ljwFKfIAfxb8dq54bE0UA6tm4Y9vbSi8WZOXu32R5PmM8P_AbUujRtUqLYSUc9TEgfyYkBa6Zkd215gtgJVxBvPM7efSG3x9ZSuGNjVdVF-DiYc4=w1178-h1086-s-no-gm?authuser=0' },
      { name: 'Poulet Curry', description: 'Spécialité de crème, emmental, poulet haché, persil, épices, sauce curry fait maison, olives noires, herbes. Pour les fans de Bollywood.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczOrwilQbI83yIUg5YIUHeOZSMVrqlhnB-O01h8IGIQiTlcot-szx6DT1RH9wthPavaOxmNekfndTxDNrepHQI-h5x5Yf2gxrZ7iDcqJlTxNCraTYHSBC1Npga-feZCAeCAUvJ0jbQBYczUZ33pmZpsD=w1176-h1096-s-no-gm?authuser=0' },
      { name: 'Tuna', description: 'Spécialité de crème, emmental, thon, poivrons, olives noires, herbes.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczNjGUhyQur7YqzVGzcN_edtPpw5dpE9wK94NaEG62FgDfhgY0u6fJhfXylxlk8yLeyyZFqGIfbKf8CKbLPkf4Z6hxhjndeG_scguNI0AL7u-9w1FAnJtDFoMQ3N8a_5Z8VNk_yuGPdW0sOUnE80Nu27=w1182-h1094-s-no-gm?authuser=0' },
      { name: 'Chausson Royale', description: 'A base de creme, jambon de dinde, mozzarella, champignon, oeuf.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczMfmv9p-1Dnu6WEQ61nLHxk74gwGJr5LApnUBdc0WDhbbC03ZyM00PwqbCR63SBER8Sw_0dqfehNEho97eDAbqxf8FX4kwVWwIuX9vW-kBhKDzZD_a7q9MbNBFwt-MsnczaDN-fMkZVYR1opNGC8ro8=w1186-h1096-s-no-gm?authuser=0' },
      { name: 'Pure Champignon', description: "Sur base d'huile d'olive, basilique et de mozzarelle les produits révèlent toutes leurs saveurs.", price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPhMIWWRPdSlr40qO5-RhobeM48b_LcdUC6b1dPpST8JqXeezE7nwzNSNFtvL5-tI8pWx8qZ4h2weWYNmJ8qGsn-Ioq57XsWB8Ly_V32s65ydj8QTGNkqgEOCz1jZBLAUWgBLVF6p0vDLMKOqTU21VZ=w1182-h1092-s-no-gm?authuser=0' },
      { name: 'Chausson Carne', description: 'Chausson a la viande épicé, mozzarella et oeuf.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczNkHBj8nN34Bq1TxCVpCSV_E3DAfaJQD5TOhJGVFmnKEbWQZJtcYKE51_2maK8pjxj3tDEcbxNS9c_hjAIObRjp3EEXhywTLxD2J5A3JB1MSdfG540CTnUqAHX9eobLTgC8p65sO9uq8q6ShdF6mD79=w1174-h1100-s-no-gm?authuser=0' },
      { name: 'Pure Végétarienne', description: "Sur base Du huile d'olive basilic et de mozzarelle les produits révèle toute leur saveur.", price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczOYoyWdfOm1DfDTWBKvRmFOto3-tLFyUpkUo6KfSVI6IuRMAjrCaDW4uQeZ5CQ0FXEI97MT1-FKBudR02axxF4LxgoJO2REJDHuwd5I0ORaq3Vuoeusq6bF04kllR-oUOARnXrz1bVmRWK8gvypXRyz=w1176-h1092-s-no-gm?authuser=0' },
      { name: 'Pure Poivrons', description: "Sur une base d'huile d'olive basilic et de mozzarella tous les produits révèlent leurs saveurs.", price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczNfCnZDqueUAiyHpd_YNgx83IIAPrvJ_6fg6cAlv5wI_E9JZJ5LHUwZ8tbhzT5u2ofPrKYfOceQNITxbQ54-HSyFxAsNxCXK1aIwFObzmUBZjSSbYddWtI9IjFr9Zqaf2nGbYHlgtA7sGSbzn0z8iRQ=w1182-h1098-s-no-gm?authuser=0' },
    ],
  },
  {
    title: 'Pizzas - Base tomate',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOgqwgYIvGn1PpOa06IiSC1TGbQo_dUoBQMYnpmuSlesEpzr8oDTLRd4GR03pgkk2KXHmdbOuy5l9RPB-4yqCFSA7nyCYQeB6wt9uWFaqNaYJ4Q_gIY4js6C8vJYlpHEqXov5PoPb1bIYybGruUilm_=w1179-h1457-s-no-gm?authuser=0',
    items: [
      { name: 'Arménienne', description: 'Sauce tomate maison. emmental, préparation de viande de bœuf, poivrons, coriandre, menthe, olives noires, herbes.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczM5TLAz4b011tFemghSXDgY7jZiMwcKcZd3cAMNXTnM5qrrbfU9pN-TNEdDN0Lm2e9gYxEb8XBDaNAxJv0B2WygygzQGrD5KqP_OkMwJtb6QgVHm-kp1_gH-z7LG4WPN0CZxrbVIW0BT_PwAi2--hOj=w1178-h1090-s-no-gm?authuser=0' },
      { name: '4 Fromages', description: 'Sauce tomate maison, emmental, roquefort, mozzarella, chèvre, olives noires, herbes.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPxkVbYMmmgd7174smgW0WdwgVvRckhNKyZPoRQvA6qnwlOhoNnAMIxxw4j9zF0Sl-HxtBfVxNTyeAq2bax0trbdY3MWxSaTUuojiXB5-VDyVeZrLme-soZkpmIbvpH3FV5JmwOq7wnBwGdW_hzzqQu=w1182-h1098-s-no-gm?authuser=0' },
      { name: 'Moitié moitié Anchois Fromage', description: 'Sauce tomate maison, emmental, anchois, olives noires, herbes.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczMWct5wQ2Dts4101KNZXYYe4nt4NDVCDcYuCC12dDEGy3W-Z4qH4jQSQMKKF_lqLlWrvV-3rcayTE3tOvm7nRVMco7wIIP2TUIDhjdyIFAVYQDoowJJasCjD-M1vjzMt5l38fNIF3R1OuLHGsLhLkvw=w1182-h1100-s-no-gm?authuser=0' },
      { name: 'Anchois', description: 'Sauce tomate préparé maison, anchois de méditerrannée, olives noires, herbes pour pizza.', price: '9€', image: 'https://lh3.googleusercontent.com/pw/AP1GczN255EEmH4bzEsZ-g1RNjecpA0WlB6vkRrsE6Fl1zUtYsKTkBjH4RcKoQxljv9J_JgZQXzXeUNA3ej-XsmUFw1jWwHcvIbFtc-Qp8v0FV_zqlGIoywWaeB0tbQONf6aRf0R9RdFgvS141pLdk8kVUB7=w1184-h1100-s-no-gm?authuser=0' },
      { name: 'Champignons', description: 'Sauce tomate préparée maison, emmental, olives noires, herbes, champignons préparés avec ail, persil et crème fraiche.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczOWRYFwn5Fr3CjNlnPJYdkPdk7nsln_9p-98rL0YLZ7R3vHYwC-u8cykKqHmV8Yu_VgssMwi1NSobt846uxJbj_BLJdwBZuefruGnIvHpqo0JjoMd-oqefJHu0TWML73v-nH9D8lYujBl2IlSDVgGp1=w1226-h1227-s-no-gm?authuser=0' },
      { name: 'Merguez', description: 'Sauce tomate préparé maison, emmental, olives noires, herbes, merguez maison pimenté.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPAul3AC1xCPpSRSUs_Kro78f7e4llz_6TjQeTkvOz-_Mp76gDILIIlzTBcx9sbk7Bks4-h7eOjdaj4I3iOrHPQy45qjr_2UtvFiR91QHkWOanHtfCHyzy3vL3jz491qPsmClRECK_HLvChKZ4_Ihf7=w1228-h1227-s-no-gm?authuser=0' },
      { name: 'Jambon de dinde', description: 'Sauce tomate maison, emmental, jambon de dinde de qualité supérieur, olives noires, herbes pour pizza.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczNjGUhyQur7YqzVGzcN_edtPpw5dpE9wK94NaEG62FgDfhgY0u6fJhfXylxlk8yLeyyZFqGIfbKf8CKbLPkf4Z6hxhjndeG_scguNI0AL7u-9w1FAnJtDFoMQ3N8a_5Z8VNk_yuGPdW0sOUnE80Nu27=w1182-h1094-s-no-gm?authuser=0' },
      { name: 'Mozzarella', description: 'Sauce tomate maison, emmental, mozzarella, olives noires, herbes pour pizza.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczNP5FyD5nj3tBbEymohJNIxLBVcnyRi7GIJmcc1weBhL1kAJNcgThUVwRfb1WwA9lDgsrafX4wwZXM9aYLKGkVnVw-MiV_WWIw2A-jQyIn1OP6OtMKGjZynXKxllMCZkqxAoMHPE0nkWdu5ZIFpKj40=w1182-h1102-s-no-gm?authuser=0' },
      { name: 'La Royale', description: 'Sauce tomate maison, emmental, jambon de dinde de qualité supérieur, champignons préparé maison, olives noires, herbes pour pizza.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczOQFdZaGp2QqZEy2QnDtEP8cEGLSmf_l8lNRRCplZNYCWjklpX-NrXpS2P2V5E5iAPvpo3uax8K5npJCQzr5013UfUqaTttaY123e4_dZAOcYk_v4do-FsK8b3VxyyP3nGlLRANvLUaBugmn6gt9N26=w1182-h1102-s-no-gm?authuser=0' },
      { name: 'Thon & Câpres', description: 'Sauce tomate maison, emmental, thon, câpres, olives noires et herbes pour pizza.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczNjGUhyQur7YqzVGzcN_edtPpw5dpE9wK94NaEG62FgDfhgY0u6fJhfXylxlk8yLeyyZFqGIfbKf8CKbLPkf4Z6hxhjndeG_scguNI0AL7u-9w1FAnJtDFoMQ3N8a_5Z8VNk_yuGPdW0sOUnE80Nu27=w1182-h1094-s-no-gm?authuser=0' },
      { name: 'Poivrons', description: 'Sauce tomate maison, emmental, melange de poivrons frais et cru,olives noires, herbes pour pizza.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczNkVqxA3pBFeKJ2XqmxLAj_7n8uA-1lKMBzTzMg2jSlXaD2wLuo9CyRz3hLEr2-ufvKapoPvyoc0y9Y6FbyAaXTUps5CUCQ5kupMnGYBap12uZV3d8908P_L_g3cKS6MmzmEcgN0nC1HgPQ1wPGmB4s=w1180-h1100-s-no-gm?authuser=0' },
      { name: 'Végétarienne', description: 'Sauce tomate maison, emmental, aubergines ou courgettes selon marché, olives noires, herbes pour pizza.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczOaJkTlITXD_A3Vya2nhPeWg1AVVbavjON40nltqRYdGpIAS4VMdHox_cOpg--rhRD2DvfjSdpzSSJhw1vzgZmGL9tHxAeMba_sogEEVzcJB6fAp-l_JQYZSANt6rAM0ve_OV8J7UXb35-81Tg9vQkf=w1180-h1100-s-no-gm?authuser=0' },
      { name: 'Chèvre', description: 'Sauce tomate maison, emmental, chèvre, olives noires, herbes pour pizza.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczOZNADIaGjgB0N5VP3eUyPW291YD-iSXb7rXtnlGfSyLDGrC4Re2XLCRDVAneVi2Iqfk6csXVvF9nTO5GVOY0NgedawouXxuy_5MeX9PWfVvx-Z_idiEH8BMRDT3B9cz-aWeV2sCP4OnGqnoEzZixos=w1182-h1096-s-no-gm?authuser=0' },
      { name: 'Fromage', description: 'Sauce tomate maison, Emmental origine France, olives noires.', price: '11€', image: 'https://lh3.googleusercontent.com/pw/AP1GczM742p4v0HZXzmobn31JfdbucwXYEt32Pdy2LcgQyIfnCmB-l0X0Fx5FQdjV3uVZxs_ZAFGUR3_RbiR352zD_MWre4rlmBpofBdwuAAHfearRkAciUBvWFArWCO2JlKfV-c_Xp3Ke7AvKoUdPtVqAEH=w1184-h1104-s-no-gm?authuser=0' },
    ],
  },
  {
    title: 'Pizzas - Base crème',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPFVcFu6ZZ73ZuNBX82eOTFHSxGL54ygKEIVbjVbPGFaklxJJk6P1eebNal4pQC4Q9YEhfzRK22Hrv5vyYgWUd1lOCElEORD0w2Q08f_6ama7syFEuotSvC_Ob5RIFKiiBq_wEY-pwQCCEK5Q6_nZ-W=w1179-h1236-s-no-gm?authuser=0',
    items: [
      { name: 'Poulet crème', description: 'Spécialité de crème, emmental, poulet haché, persil, oignon, épices, olives noires, herbes.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczMPsTJlWx6wLEq61fPFj4a6TcQsi4SWPLP5CO4wVM806_BspAKHpRnskHLdMBx8H8Kt7MFwc3AHjqaS3qKQTG21Et8pYtQfxs77_yf1Qw1xv9CUwsAzIn2vtVUDe18Y5xyzywY93HO09h5fDlG1a3Pl=w1176-h1098-s-no-gm?authuser=0' },
      { name: 'Royale crème', description: 'Spécialité de crème, emmental, jambon de dinde de qualité supérieure et champignons préparé maison, olives noires, herbes. Pour les gourmands et les gourmandes.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczMLkX904jy0jDTPOB82zU20P3Mg9LlDGvvl0_EL8KlyznUzGGnicpsPfo_rwd5vSmrTwOxihhcMw2nZFm5vhgSOdaRTjomUy1a6BbV7HTK4IcNmv7lT6GvPZ_IKskItEBbUB7ACdCFpLMjRx9mjEMwg=w1180-h1102-s-no-gm?authuser=0' },
      { name: 'Jambon de dinde crème', description: 'Spécialité de crème, emmental, jambon de dinde, olives noires, herbes. Rien de plus pour un résultat parfait.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczP2Sh5sP4SMJNUE1leZjyOXmIomlJj0Q6gUcN7Lw_pBPiGIUJMYLMaV6fEYz8s2gWC8oVkjlVcPcIh5PVxCPdX7BK8dqdxbx6hZs8M4nQHe6jQEJnmJCWet2yqiOdiazAuN9slRTEorlJ9Nrzi-uY7P=w1182-h1102-s-no-gm?authuser=0' },
      { name: '4 Fromages crème', description: 'Spécialité de crème, emmental, roquefort, chèvre, mozzarella, olives noires et herbes. Pour les fondus de fromages seulement.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPufUnIy5uuW47jijLYVM5uijzSKHPMJP_uIlKHjY35l9I4GPjwMr09mWVZWMLFidzXK17utopkgyTO72e4n-PZ8rc6-8OIHmH5kvLg5yP3OREgaQee3sy4KylwSNimJNd8NxKEhGS6Dk6yLWlLyk_6=w1180-h1098-s-no-gm?authuser=0' },
      { name: 'Chèvre miel crème', description: 'Spécialité de crème, emmental, chèvre et miel, olives noires, herbes. Sucré salé on adore.', price: '13€', image: 'https://lh3.googleusercontent.com/pw/AP1GczPBNewm_IMdyr7B_VJ9RQfMQnLIi6R3C3Osz9D6Xm4LP7p7f7s8cNCb7p7HGaYouSQ_BbMeylDIiexcp1OhHrGcKLFwi_NUTDkcFNpMsh6jdf_mmXKoK7shqdwgRWFMCc0k5kCNGWkRAnwwoBKljlns=w1180-h1100-s-no-gm?authuser=0' },
    ],
  },
];

export default function MenuSection() {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const selectedMenu = selectedMenuIndex !== null ? menuData[selectedMenuIndex] : null;

  const handlePrevious = () => {
    if (selectedMenuIndex !== null) {
      const newIndex = selectedMenuIndex === 0 ? menuData.length - 1 : selectedMenuIndex - 1;
      setSelectedMenuIndex(newIndex);
      setTimeout(() => {
        modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  const handleNext = () => {
    if (selectedMenuIndex !== null) {
      const newIndex = selectedMenuIndex === menuData.length - 1 ? 0 : selectedMenuIndex + 1;
      setSelectedMenuIndex(newIndex);
      setTimeout(() => {
        modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            menuData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleColumns((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="min-h-screen">
      <h2 className="sr-only">Notre Menu de Pizzas Artisanales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        {menuData.map((category, index) => (
          <div
            key={index}
            className={`relative h-full overflow-hidden cursor-pointer group transition-all duration-700 ${
              visibleColumns[index] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
            onClick={() => setSelectedMenuIndex(index)}
          >
            <img
              src={category.image}
              alt={`Menu ${category.title} - Pizza Charly Marseille`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl md:text-4xl font-bold text-center px-4 transform group-hover:scale-110 transition-transform duration-500">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMenu && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedMenuIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-[#bd0926] text-white p-2 md:p-3 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronLeft size={24} className="md:hidden" />
            <ChevronLeft size={32} className="hidden md:block" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-[#bd0926] text-white p-2 md:p-3 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110 z-10"
          >
            <ChevronRight size={24} className="md:hidden" />
            <ChevronRight size={32} className="hidden md:block" />
          </button>

          <div
            ref={modalContentRef}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMenuIndex(null)}
              className="sticky top-4 right-4 float-right bg-[#bd0926] text-white p-2 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110 z-10"
            >
              <X size={24} />
            </button>
            <div className="p-8">
              <h2 className="text-4xl font-bold text-[#bd0926] mb-8 text-center">{selectedMenu.title}</h2>
              <div className="space-y-6">
                {selectedMenu.items.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded transition-colors duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {item.image && (
                        <div className="flex-shrink-0 w-full md:w-24 h-48 md:h-24 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={`Pizza ${item.name} - ${item.description.substring(0, 50)}...`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{item.name}</h4>
                          <span className="text-xl font-bold text-[#bd0926] ml-4">{item.price}</span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
