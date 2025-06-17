// src/app/api/shorten/route.ts
import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string" || !isValidUrl(url)) {
      return new Response(JSON.stringify({ error: "URL inválida" }), {
        status: 400,
      });
    }

    // Buscar si ya existe
    const existing = await redis.get<string>(`url:${url}`);
    if (existing) {
      return Response.json({ shortUrl: `${getBaseUrl()}/${existing}` });
    }

    // Generar nuevo slug y guardar en ambas direcciones
    const slug = nanoid(6);
    await redis.set(`slug:${slug}`, url);
    await redis.set(`url:${url}`, slug);

    return Response.json({ shortUrl: `${getBaseUrl()}/${slug}` });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Error del servidor" }), {
      status: 500,
    });
  }
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getBaseUrl() {
  return process.env.NEXT_VERCEL_URL
    ? `https://${process.env.NEXT_VERCEL_URL}`
    : "http://localhost:3000";
}
