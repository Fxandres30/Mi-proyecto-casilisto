import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const { error } = await supabase.from("boletos").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, message: "Error al eliminar boleto" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Boleto eliminado" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 });
  }
}
