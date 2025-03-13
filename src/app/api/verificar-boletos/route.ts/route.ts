import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    // Buscar boletos por correo o teléfono
    const { data, error } = await supabase
      .from("boletos")
      .select("*")
      .or(`correo.eq.${input}, telefono.eq.${input}`);

    if (error) {
      return NextResponse.json({ success: false, message: "Error al buscar boletos" }, { status: 500 });
    }

    return NextResponse.json({ success: true, boletos: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 });
  }
}
