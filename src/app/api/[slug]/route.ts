import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const slug = context.params.slug;
  if (!slug) {
    return new NextResponse("Slug required.", { status: 400 });
  }
  const originalUrl = await redis.get<string>(`slug:${slug}`);
  if (!originalUrl) {
    return new NextResponse("Slug not found.", { status: 404 });
  }
  return NextResponse.redirect(originalUrl, 301);
}
