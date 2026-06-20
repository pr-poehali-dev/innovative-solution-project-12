import { useState } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/1149d9f1-c3d9-426f-b933-7c42ab7c57a1";

export default function GetKey() {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const getKey = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { method: "GET" });
      const data = await res.json();
      if (!res.ok) {
        setError("Ключи временно закончились. Попробуйте позже или зайдите в Telegram.");
      } else {
        setKey(data.key);
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  const copyKey = () => {
    if (!key) return;
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="get-key"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6"
    >
      <div className="absolute inset-0">
        <img
          src="/images/mountain-landscape.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center max-w-lg w-full">
        <p className="uppercase text-xs tracking-[0.3em] text-white/40 mb-4">Без Telegram</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
          Получи ключ<br />прямо здесь
        </h2>
        <p className="text-white/55 text-lg mb-12 leading-relaxed">
          Нажми кнопку — ключ появится на экране. Скопируй и активируй в Happ.
        </p>

        {!key ? (
          <button
            onClick={getKey}
            disabled={loading}
            className="glass-btn text-white px-12 py-5 text-sm uppercase tracking-widest font-semibold rounded-full flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                Получаем...
              </>
            ) : (
              <>
                <Icon name="Key" size={16} />
                Получить ключ
              </>
            )}
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="glass rounded-2xl px-8 py-6 flex items-center gap-5 w-full justify-between">
              <span className="text-xl md:text-2xl font-mono font-bold tracking-widest text-white">
                {key}
              </span>
              <button
                onClick={copyKey}
                className="glass-btn rounded-xl p-3 text-white transition-all"
                title="Скопировать"
              >
                <Icon name={copied ? "Check" : "Copy"} size={18} />
              </button>
            </div>
            <p className="text-white/40 text-sm">
              {copied ? "Скопировано!" : "Нажми на иконку, чтобы скопировать"}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 glass rounded-xl px-5 py-3 flex items-center gap-2 text-red-300 text-sm">
            <Icon name="AlertCircle" size={15} />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-14 flex items-center gap-3 text-white/30 text-sm">
          <Icon name="MessageCircle" size={15} />
          <span>Также в</span>
          <a
            href="https://t.me/Happ_Free_keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
          >
            Telegram-канале
          </a>
        </div>
      </div>
    </div>
  );
}
