import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

export function configDb() {
  dotenv.config();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  return createClient(supabaseUrl || "", supabaseKey || "");
}
