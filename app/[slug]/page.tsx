import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Props } from "@/types";

export default async function SlugRedirectPage({ params }: Props) {
  const { slug } = params;
  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data?.original_url) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-2xl font-bold">404 - URL no encontrada</h1>
          <p className="mt-2 text-gray-400">Este enlace acortado no existe.</p>
        </div>
      </div>
    );
  }

  redirect(data.original_url);
}
