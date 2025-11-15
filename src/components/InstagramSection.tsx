import { Instagram } from 'lucide-react';

const instagramPosts = [
  'https://lh3.googleusercontent.com/pw/AP1GczNXT8ilccQuZy8EZTMrI8C6cAf27UkULoYdgzrcXjw1zPJjLDivK3GbO96cgRX7haQEe4_zo5GAD_oCeILdX-CF5_w-tIkIJBh_Iuc_x3nv43sd66Zz48msPbQLWUceGlVur0tQ2sO3vY0SO0fslnNO=w1172-h1567-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczMovYL_FDAZkcce9pyHnChUOCRUdZqerCI3MBwfgdMEvTGySxPl1x-eXL-eqJPq2y5piyc1DMuKeqErUNegYeftZSYA7Q2UI0oXDgG0YMDRPtFO-BxdOheN4sfrDnIiDieAFxwkd4D6Zq8RjdbY4Trf=w1179-h1462-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczNAuLY3wnox8EzpO8uzrp5nBg-hJFqacpayeNsizb6LJ1RpVBAtr4fJA9QtRHN7GFGjwTSf1RZoJDlCVexQEM8tFXRHeJuPRnBClLEW067U15j6lGtZ761rXbElFXYzD6vj6Qgo3uiao-1V78vdjNQH=w1153-h1457-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczOs8p20Bbt4E7FD_wBxFzga-mApZTC1FNEneh5TDu39Uf-xTiTW7IdkqukAVcMwKObIZp7yP1SXjok3IIpZzayTEm4bIHFuPq4_YkCbFpkHLBIsn1fcvL-fLcvIgYv3b67zE58Gq1coIF3XVp-KYjXO=w1179-h1476-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczNr9Rug8dqslw2BCgeN3m1s7fltH2FpIXEnBWgHVep_tfOaG32Ljj772hxSUNX_jzS9FaQMAuFcMxWlxIM2qFnSfyyYSUDUDoefsd0efmw_WGrtH-P99e994PrBgq6MyuXj31P2IuV-93WzsqhAQKty=w1179-h1555-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczPsDKkH3Wn9BOkHpweKDbwXmKwfO7PDuSWRck_9nYDmWfMLZgabEMN2OxDAmkcOszfX9d42iG3NN-I0FJh6CRR8Bp8SN-KKsA6Gfzotg4Y7uWPE-4QOR0ySQEbfOnaEGeLwaV2KTjqKHhx_JvOZTcao=w1066-h1602-s-no-gm?authuser=0',
];

export default function InstagramSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Suivez-nous sur Instagram
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {instagramPosts.map((post, index) => {
            const isAlwaysColor = index === 0 || index === 3 || index === 4;
            return (
              <a
                key={index}
                href="https://instagram.com/pizzacharly"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={post}
                  alt={`Instagram post ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                    isAlwaysColor
                      ? 'filter-none md:grayscale md:group-hover:grayscale-0'
                      : 'filter grayscale group-hover:grayscale-0'
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="https://instagram.com/pizzacharly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#bd0926] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#9d0720] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Instagram size={24} />
            Suivez-nous @pizzacharly
          </a>
        </div>
      </div>
    </section>
  );
}
