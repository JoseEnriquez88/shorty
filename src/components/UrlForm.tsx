"use client";
import { useState } from "react";

interface Props {
  setShortUrl: (url: string) => void;
  setError: (msg: string) => void;
}

export default function UrlForm({ setShortUrl, setError }: Props) {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl("");
    setError("");

    if (!input.startsWith("http")) {
      setError("La URL debe comenzar con http:// o https://");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ url: input }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error desconocido");

      setShortUrl(data.shortUrl);
      setInput("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-md flex gap-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-slate-600/50 to-blue-600/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <input
          type="url"
          placeholder="Pegar URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="relative w-full p-4 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-600/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-lg"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-500 hover:to-slate-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        <span className="relative">{loading ? "Acortando..." : "Acortar"}</span>
      </button>
    </form>
  );
}
