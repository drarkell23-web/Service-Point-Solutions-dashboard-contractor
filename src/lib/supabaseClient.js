import { createClient } from "@supabase/supabase-js";

// -----------------------------
//  REQUIRED ENVIRONMENTS
// -----------------------------
// Make sure these are added in Render environment variables
// SUPABASE_URL
// SUPABASE_ANON_KEY
// -----------------------------

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
