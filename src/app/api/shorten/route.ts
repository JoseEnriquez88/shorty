import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { isValidUrl } from "@/utils/validateUrl";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || !isValidUrl(url))
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });

    const { data: existing, error: findError } = await supabase
      .from("urls")
      .select("slug")
      .eq("original_url", url)
      .maybeSingle();

    if (findError) {
      console.error("Find error:", findError.message);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    if (existing)
      return NextResponse.json({ slug: existing.slug }, { status: 200 });

    const slug = nanoid(6);

    const { error: insertError } = await supabase.from("urls").insert([
      {
        slug,
        original_url: url,
      },
    ]);

    if (insertError) {
      console.error(
        "Supabase insert error:",
        insertError.message,
        insertError.details
      );
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ slug }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
