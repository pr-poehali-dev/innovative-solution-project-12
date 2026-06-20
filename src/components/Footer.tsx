export default function Footer() {
  return (
    <div
      className="relative h-[400px] sm:h-[600px] lg:h-[800px] max-h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+600px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[400px] sm:h-[600px] lg:h-[800px] sticky top-[calc(100vh-400px)] sm:top-[calc(100vh-600px)] lg:top-[calc(100vh-800px)]">
          <div
            className="py-8 px-6 h-full w-full flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0d0d0d 100%)"
            }}
          >
            <div className="flex shrink-0 gap-8 sm:gap-12 lg:gap-20">
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 uppercase text-white/30 text-xs tracking-widest">Happ</h3>
                <a href="#features" className="text-white/60 hover:text-white transition-colors text-sm">Возможности</a>
                <a href="#get-key" className="text-white/60 hover:text-white transition-colors text-sm">Получить ключ</a>
                <a
                  href="https://t.me/Happ_Free_keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Telegram
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 uppercase text-white/30 text-xs tracking-widest">Поддержка</h3>
                <a
                  href="https://t.me/Happ_Free_keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <h1 className="text-[18vw] sm:text-[16vw] lg:text-[14vw] leading-[0.8] mt-6 font-bold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                HAPP
              </h1>
              <p className="text-white/30 text-sm">{new Date().getFullYear()} Happ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
