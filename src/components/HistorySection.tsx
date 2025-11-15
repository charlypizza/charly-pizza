export default function HistorySection() {
  return (
    <section id="histoire" className="relative w-full overflow-hidden z-10">
      <div className="relative w-full">
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNrROlXCZ1RkkgGs2NOFfeCYJRUbM2MNpeCB_S_tuCXpcD-zLsGGdlOWWuVUfMD5XGY0CbjTUk4hIvFn-tFyx_loEvwU3V90b8UiArk93v8RblG86vnlBkUu62HoFucITc6A84l9j2dqGkezLnkgPw=w2940-h706-s-no-gm?authuser=0"
          alt="Histoire Pizza Charly"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h2 className="text-white text-sm md:text-4xl font-bold text-center mb-1 md:mb-4 animate-fadeInUp">
          Pizza Charly, née en 1962, au cœur du Vieux Port.
        </h2>
        <p
          className="text-white text-xs md:text-2xl text-center font-light animate-fadeInUp"
          style={{ animationDelay: '300ms' }}
        >
          Un héritage marseillais transmis, réinventé, partagé.
        </p>
      </div>
    </section>
  );
}
