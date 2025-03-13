import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function checkSupabaseConnection() { // ✅ Exportamos correctamente
  try {
    const { data, error } = await supabase.from("boletos").select("*").limit(1);
    if (error) {
      console.error("Error al conectar con Supabase:", error);
    } else {
      console.log("Conexión exitosa a Supabase:", data);
    }
  } catch (err) {
    console.error("Error en la prueba de conexión:", err);
  }
}

export async function testConnection() { // ✅ Segunda función exportada correctamente
  try {
    const { data, error } = await supabase.rpc("version");
    if (error) {
      console.error("Error en testConnection:", error);
    } else {
      console.log("Versión de Supabase:", data);
    }
  } catch (err) {
    console.error("Error en testConnection:", err);
  }
}
