const features = [
  {
    icon: "⚡",
    title: "Мгновенная активация",
    desc: "Вставь ключ в приложение — доступ открывается сразу, без ожидания.",
  },
  {
    icon: "🔓",
    title: "Полный доступ",
    desc: "Все функции Happ без ограничений. Никаких скрытых условий.",
  },
  {
    icon: "🎁",
    title: "Абсолютно бесплатно",
    desc: "Никаких платежей. Просто берёшь ключ и пользуешься.",
  },
  {
    icon: "🔄",
    title: "Новые ключи каждый день",
    desc: "База пополняется регулярно — следи за обновлениями в Telegram.",
  },
];

export default function Featured() {
  return (
    <div
      id="features"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24 px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="mb-16 text-center">
          <p className="uppercase text-xs tracking-[0.3em] text-white/40 mb-4">Почему Happ</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Всё просто
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-8">
              <div className="text-4xl mb-5">{f.icon}</div>
              <h3 className="text-white font-semibold text-xl mb-3">{f.title}</h3>
              <p className="text-white/55 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest mb-2">Шаг за шагом</p>
            <h3 className="text-white text-2xl font-bold">Как это работает?</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-center">
            {["Жми «Получить ключ»", "Копируй код", "Вставь в Happ"].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="glass rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-white/70 text-sm max-w-[120px] leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
