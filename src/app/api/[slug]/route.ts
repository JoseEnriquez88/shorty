import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type Context = {
  params: {
    slug: string;
  };
};

export async function GET(req: Request, context: Context) {
  const slug = context.params.slug;
  if (!slug) {
    return new NextResponse("Slug requerido", { status: 400 });
  }
  const originalUrl = await redis.get<string>(`slug:${slug}`);
  if (!originalUrl) {
    return new NextResponse("Slug no encontrado", { status: 404 });
  }
  return NextResponse.redirect(originalUrl, 301);
}
