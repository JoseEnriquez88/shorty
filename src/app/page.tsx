"use client";
import { useState } from "react";
import UrlForm from "@/components/UrlForm";

export default function HomePage() {
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:40px_40px]"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Shorty
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-slate-600 rounded-full mx-auto"></div>
        </div>
        <UrlForm setShortUrl={setShortUrl} setError={setError} />
        {shortUrl && (
          <div className="mt-8 p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-xl max-w-md w-full">
            <div className="text-sm text-slate-400 mb-2">URL acortada:</div>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors break-all font-mono underline decoration-blue-400/30 hover:decoration-blue-300/50"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center backdrop-blur-sm max-w-md w-full">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
