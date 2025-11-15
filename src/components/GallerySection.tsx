const galleryImages = [
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczNccJXLwT0DZfhPFp_MGoqClnM8ymEbysbTAkQeFal1mKojWC0BUg6wnds6uFJzkJuMzKATGNEdb-gUOxEfd3wnYif2qAA0iDhrOwZU8MJoYt9in41Q3iYDel4DOVuNohA2FvITRaRJ5gwZc6pgQqir=w1179-h1032-s-no-gm?authuser=0', alt: 'Pizza artisanale fraîche sortant du four - Pizza Charly Marseille' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczOqCOEVzhlUeRfOWlHxofwocn16wVE8q9j6Mxux_54U1KvlpoD-GDvn-sZ85sp1KDHdiAYcuBIebePegAsEWJE9dJzDR9ioOyLHWTU-R0tG0BIHs0notVbXnxpxjCnxBGn-NSKWW6j5IKSBHIHeITfc=w1036-h1602-s-no-gm?authuser=0', alt: 'Ambiance chaleureuse restaurant Pizza Charly' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczMfTgswjOs276fJU-gS_FfBXbf5cyNY-ybwNgxclXe3-xzD9o8ZhQHBIRW7tEAwqd2kmop_F4nz5n_fNuTwTldTjc3FlcJtBaYyRLV5i0egLbQ4EqXm4k41h9eMyDn0ADL2zotm7VEFS63YwgJLYmbb=w1068-h1602-s-no-gm?authuser=0', alt: 'Préparation pizza traditionnelle pâte fraîche maison' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczOCHy4gFLTiX3TEUfUq8ft8WPvYrRCr98TeQTbu3Bs6t2NeOB2Hx74cDnqSrLSlqH37xqyGDoWibnBtTHG8rDHhqdTv9RN5RRpkTNJRcUZC7TwOsP66q96RTKkp0w2Dx8efQxdm626OuigvHWbGsAsK=w1171-h1544-s-no-gm?authuser=0', alt: 'Pizza italienne garnie ingrédients frais de qualité' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczOcHcboG7P6HyaZNhwn95JXSw0Ee4KnmRipRYYqae2UtBiyzEUc0ZbM-yMktR-x17HieGylX2YnQEm0htsDewQKPTgVQxDsp8SzeARGFmP6nQGT3FOxKB662B2YuEbS0MV49fSlV3DQr-N2HEhpw518=w1066-h1602-s-no-gm?authuser=0', alt: 'Pizza spéciale recette maison pizzeria marseillaise' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczMC51WE8Uc2lk116jDSJu6c3j6wvaUd7VIvteVeXvA0eCD8kTF06oi2p06UVhdP-eqnv5q6gulMadW3TjGfL4xvjcZIBsv1BBLatfQvS9xVg7-bHGHiq3f59ekhMI_quZs49GofQPj8HZnYyoTA68A8=w1228-h1506-s-no-gm?authuser=0', alt: 'Pizza généreusement garnie tomate fraîche mozzarella' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczOqTZc0vRgUGC6kZ6EvyprqHfXkrSsDIknfCcuJOmP8PVQsqftSCX1tJTGe2AFuzHum0cDlcUCzh8u0pYR11CO6ALrf_54YWmrbYEp41ugfobzh2tJAYi9Jy9vY5SkA9Wzrsy40AUkHlcgDbzEHITJY=w1068-h1602-s-no-gm?authuser=0', alt: 'Assortiment pizzas artisanales variées Pizza Charly' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczMfQoGlViU3rYVECvfLycufrJLzKN3g9_0o3j4q2QfsDmY_s2NYSDrO3cXQVLS-58ABH2-XyhzuMK9IHspZ6zNJXNGeWdOYHD6fCgCqA8dzzO5r8SIqfl3Yz8yRoVbgGXbX76qovPPpzWq-BZzVOBW1=w1173-h1554-s-no-gm?authuser=0', alt: 'Pizza quatre fromages crème fraîche spécialité italienne' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczOPCgbACYX4YAC6_auEfAOWNirH9grbnWAPqPSqenSnxY02p9SScJM97wvs94Tks0rE5w-_zRIfpSoE0VkL0rTi_JXUiXkJmGOAaTVVBbI5yefSqrrK60vnJRSkZpLPji0zmUlwpQ1ZR2z4VQyja-pi=w1068-h1602-s-no-gm?authuser=0', alt: 'Pizza méditerranéenne légumes frais saison' },
  { src: 'https://lh3.googleusercontent.com/pw/AP1GczMbjcvHhkeWpoemKnzNd-sn4t6cc1b_FJaugASGvQ_Qobo5rjQI73tSRXFx-0re4-MnqzzVzvYAtuKOXQoSu-J2Jokh4pgAmS0mkV08-hWEham_xKbmkB2kf_XLXY0rgJOqxlN1yhprPp_KvD_u0iVl=w1228-h1448-s-no-gm?authuser=0', alt: 'Intérieur pizzeria traditionnelle marseillaise ambiance conviviale' },
];

export default function GallerySection() {
  const handleImageClick = () => {
    window.open('https://www.instagram.com/charlypizzamarseille/', '_blank');
  };

  return (
    <section id="galerie" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        <div
          className="relative overflow-hidden cursor-pointer group md:col-span-2 h-[400px] md:h-[600px]"
          onClick={handleImageClick}
        >
          <img
            src={galleryImages[0].src}
            alt={galleryImages[0].alt}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
        </div>

        <div className="grid grid-cols-2 gap-0 md:col-span-1">
          {galleryImages.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer group h-[200px] md:h-[300px]"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-0 md:col-span-1 order-last md:order-none">
          {galleryImages.slice(5, 9).map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer group h-[200px] md:h-[300px]"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div
          className="relative overflow-hidden cursor-pointer group md:col-span-2 h-[400px] md:h-[600px]"
          onClick={handleImageClick}
        >
          <img
            src={galleryImages[9].src}
            alt={galleryImages[9].alt}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
        </div>
      </div>
    </section>
  );
}
