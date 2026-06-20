import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8vh", "8vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full will-change-transform">
          <img
            src="/images/spiral-circles.jpg"
            alt="Abstract spiral"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <div className="glass rounded-2xl px-6 py-2 inline-block">
          <span className="text-xs uppercase tracking-[0.3em] text-white/70">Как это работает</span>
        </div>
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Нажми «Получить ключ», скопируй его и активируй в приложении Happ.
        </p>
        <p className="text-white/50 text-lg max-w-xl">
          Никакой оплаты, никаких ограничений — доступ открывается мгновенно.
        </p>
        <a
          href="#get-key"
          className="glass-btn text-white px-10 py-4 text-sm uppercase tracking-widest font-semibold rounded-full"
        >
          Попробовать сейчас
        </a>
      </div>
    </div>
  );
}
