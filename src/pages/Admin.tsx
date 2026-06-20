import { useState } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/1149d9f1-c3d9-426f-b933-7c42ab7c57a1";

export default function Admin() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [keysText, setKeysText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ added: number; remaining: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setAuthError(false);
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
      body: JSON.stringify({ keys: [] }),
    });
    if (res.status === 403) {
      setAuthError(true);
    } else {
      setAuthed(true);
    }
  };

  const uploadKeys = async () => {
    const keys = keysText.split("\n").map((k) => k.trim()).filter(Boolean);
    if (!keys.length) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
        body: JSON.stringify({ keys }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("Ошибка загрузки");
      } else {
        setResult(data);
        setKeysText("");
      }
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-10">
          <p className="text-neutral-500 uppercase text-xs tracking-widest mb-2">Happ</p>
          <h1 className="text-white text-4xl font-bold tracking-tight">Админка</h1>
        </div>

        {!authed ? (
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Введите пароль администратора"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="bg-neutral-900 border border-neutral-700 text-white px-5 py-4 w-full focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600"
            />
            {authError && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <Icon name="AlertCircle" size={14} />
                Неверный пароль
              </p>
            )}
            <button
              onClick={login}
              className="bg-white text-black px-6 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-neutral-200 transition-colors"
            >
              Войти
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
              <Icon name="CheckCircle" size={16} />
              Вы вошли как администратор
            </div>

            <div>
              <label className="text-neutral-400 text-xs uppercase tracking-widest mb-3 block">
                Ключи — каждый с новой строки
              </label>
              <textarea
                value={keysText}
                onChange={(e) => setKeysText(e.target.value)}
                placeholder={"HAPP-XXXX-YYYY-ZZZZ\nHAPP-AAAA-BBBB-CCCC\n..."}
                rows={10}
                className="bg-neutral-900 border border-neutral-700 text-white px-5 py-4 w-full font-mono text-sm focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 resize-none"
              />
            </div>

            <button
              onClick={uploadKeys}
              disabled={loading || !keysText.trim()}
              className="bg-white text-black px-6 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Загружаем...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={16} />
                  Загрузить ключи
                </>
              )}
            </button>

            {result && (
              <div className="bg-neutral-900 border border-neutral-800 px-6 py-5 flex flex-col gap-2">
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <Icon name="Check" size={14} />
                  Добавлено новых ключей: <strong>{result.added}</strong>
                </p>
                <p className="text-neutral-400 text-sm flex items-center gap-2">
                  <Icon name="Key" size={14} />
                  Свободных ключей в базе: <strong className="text-white">{result.remaining}</strong>
                </p>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-sm flex items-center gap-2">
                <Icon name="AlertCircle" size={14} />
                {error}
              </p>
            )}

            <a href="/" className="text-neutral-600 text-sm hover:text-white transition-colors mt-4 flex items-center gap-2">
              <Icon name="ArrowLeft" size={14} />
              На сайт
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
