"use client";
import { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";

interface ShortenResponse {
  slug: string;
}

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSlug("");

    try {
      const res = await axios.post<ShortenResponse>("/api/shorten", { url });
      setSlug(res.data.slug);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Shorty</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="url"
          placeholder="https://ejemplo.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Acortando..." : "Acortar"}
        </button>
      </form>

      {slug && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Tu enlace acortado:</p>
          <a
            href={`/${slug}`}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${window.location.origin}/${slug}`}
          </a>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
      )}
    </main>
  );
}
