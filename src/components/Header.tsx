export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="glass rounded-2xl px-6 py-3 flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-white font-bold text-lg tracking-widest uppercase">happ</div>
        <nav className="flex gap-6">
          <a
            href="#features"
            className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Возможности
          </a>
          <a
            href="#get-key"
            className="glass-btn text-white px-5 py-2 text-sm uppercase tracking-wider font-semibold rounded-full"
          >
            Получить ключ
          </a>
        </nav>
      </div>
    </header>
  );
}
