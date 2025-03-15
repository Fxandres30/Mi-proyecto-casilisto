import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data, error } = await supabase.from("boletos").select("*");

    if (error) {
      return NextResponse.json({ success: false, message: "Error al obtener boletos" }, { status: 500 });
    }

    return NextResponse.json({ success: true, boletos: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 });
  }
}
