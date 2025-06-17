export async function GET(
  req: NextRequest,
  { params }: NextApiRequestContext
) {
  const slug = params.slug;

  if (!slug) {
    return new NextResponse("Slug requerido", { status: 400 });
  }

  const originalUrl = await redis.get<string>(`slug:${slug}`);
  if (!originalUrl) {
    return new NextResponse("Slug no encontrado", { status: 404 });
  }

  return NextResponse.redirect(originalUrl, 301);
}
