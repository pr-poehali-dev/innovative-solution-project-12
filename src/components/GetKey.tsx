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
    <div id="get-key" className="bg-neutral-100 py-24 px-6 flex flex-col items-center text-center">
      <p className="uppercase text-xs tracking-widest text-neutral-500 mb-4">Без Telegram</p>
      <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
        Получи ключ прямо здесь
      </h2>
      <p className="text-neutral-500 max-w-md mb-10 text-lg">
        Нажми кнопку — и ключ появится на экране. Скопируй и активируй в приложении Happ.
      </p>

      {!key ? (
        <button
          onClick={getKey}
          disabled={loading}
          className="bg-black text-white px-10 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          {loading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Получаем ключ...
            </>
          ) : (
            <>
              <Icon name="Key" size={16} />
              Получить ключ
            </>
          )}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white border border-neutral-200 px-8 py-5 flex items-center gap-4">
            <span className="text-xl md:text-2xl font-mono font-bold tracking-widest text-neutral-900">
              {key}
            </span>
            <button
              onClick={copyKey}
              className="text-neutral-400 hover:text-black transition-colors"
              title="Скопировать"
            >
              <Icon name={copied ? "Check" : "Copy"} size={20} />
            </button>
          </div>
          <p className="text-sm text-neutral-500">
            {copied ? "Скопировано!" : "Нажми на иконку, чтобы скопировать"}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 flex items-center gap-2 text-red-500 text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-12 flex items-center gap-3 text-neutral-400 text-sm">
        <Icon name="MessageCircle" size={16} />
        <span>Также доступно в</span>
        <a
          href="https://t.me/Happ_Free_keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-700 underline hover:text-black transition-colors"
        >
          Telegram-канале
        </a>
      </div>
    </div>
  );
}
