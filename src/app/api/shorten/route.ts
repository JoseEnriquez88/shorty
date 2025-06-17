import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = body?.url;

    console.log("👉 POST /api/shorten - URL recibida:", url);

    if (!url || typeof url !== "string" || !isValidUrl(url)) {
      console.warn("❌ URL inválida:", url);
      return new Response(JSON.stringify({ error: "URL inválida" }), {
        status: 400,
      });
    }

    // Buscar si ya existe
    const existing = await redis.get<string>(`url:${url}`);
    if (existing) {
      console.log("✅ URL ya existe. Slug:", existing);
      return Response.json({ shortUrl: `${getBaseUrl()}/${existing}` });
    }

    // Generar slug nuevo
    const slug = nanoid(6);
    await redis.set(`slug:${slug}`, url);
    await redis.set(`url:${url}`, slug);

    console.log("✅ Nuevo slug creado:", slug);

    return Response.json({ shortUrl: `${getBaseUrl()}/${slug}` });
  } catch (err: any) {
    console.error("💥 Error en /api/shorten:", err);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
    });
  }
}

function getBaseUrl() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
