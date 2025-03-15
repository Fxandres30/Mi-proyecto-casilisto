import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const { correo, telefono, numero } = await req.json();

    const { data, error } = await supabase
      .from("boletos")
      .insert([{ correo, telefono, numero }]);

    if (error) {
      return NextResponse.json({ success: false, message: "Error al crear boleto" }, { status: 500 });
    }

    return NextResponse.json({ success: true, boleto: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 });
  }
}
