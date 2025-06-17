import { redis } from "@/lib/redis";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const originalUrl = await redis.get<string>(`slug:${slug}`);
  if (!originalUrl) {
    return new Response("Not found", { status: 404 });
  }
  return Response.redirect(originalUrl, 301);
}
