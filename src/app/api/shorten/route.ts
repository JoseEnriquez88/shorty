// src/app/api/shorten/route.ts
import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url || typeof url !== "string") {
    return new Response(JSON.stringify({ error: "URL inválida" }), {
      status: 400,
    });
  }

  const existing = await redis.get<string>(`url:${url}`);
  if (existing) {
    return Response.json({ shortUrl: `${getBaseUrl()}/${existing}` });
  }

  const slug = nanoid(6);
  await redis.set(`slug:${slug}`, url);
  await redis.set(`url:${url}`, slug);

  return Response.json({ shortUrl: `${getBaseUrl()}/${slug}` });
}

function getBaseUrl() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}
