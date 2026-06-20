import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);

  return (
    <div ref={container} className="relative flex items-center justify-center h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full will-change-transform">
        <img
          src="/images/mountain-landscape.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6 flex flex-col items-center">
        <div className="glass rounded-3xl px-10 py-3 mb-8 inline-block">
          <span className="text-xs uppercase tracking-[0.3em] text-white/80">Бесплатный доступ</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 leading-none">
          HAPP
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto opacity-80 mb-12 leading-relaxed">
          Получи бесплатный ключ и открой полный доступ к Happ за одну минуту
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#get-key"
            className="glass-btn text-white px-10 py-4 text-sm uppercase tracking-widest font-semibold rounded-full"
          >
            Получить ключ
          </a>
          <a
            href="https://t.me/Happ_Free_keys"
            target="_blank"
            rel="noopener noreferrer"
            className="glass text-white px-10 py-4 text-sm uppercase tracking-widest font-semibold rounded-full opacity-70 hover:opacity-100 transition-opacity"
          >
            Telegram
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/40 animate-pulse" />
      </div>
    </div>
  );
}
