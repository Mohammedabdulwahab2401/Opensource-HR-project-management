import { createClient } from "@supabase/supabase-js";

// ✅ Debug: Check if environment variables are loaded
console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Ensure values exist before initializing Supabase
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing! Check your .env.local file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
