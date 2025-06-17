import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(req: Request, context: any) {
  const slug = context?.params?.slug;

  if (!slug || typeof slug !== "string") {
    return new NextResponse("Slug requerido", { status: 400 });
  }

  const url = await redis.get(`slug:${slug}`);

  if (!url || typeof url !== "string") {
    return new NextResponse("Slug no encontrado", { status: 404 });
  }

  return NextResponse.redirect(url, 301);
}
