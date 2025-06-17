import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  if (!slug) return new NextResponse("Slug requerido", { status: 400 });
  const originalUrl = await redis.get<string>(`slug:${slug}`);
  if (!originalUrl)
    return new NextResponse("Slug no encontrado", { status: 404 });
  return NextResponse.redirect(originalUrl, 301);
}
