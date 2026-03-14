import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation to prevent app crash if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing. Please check your .env file.");
  // We can't really initialize the client without these, so we throw to make it obvious in dev
  // In production, you might want a more graceful handled state
  if (import.meta.env.DEV) {
    console.warn("VITE_SUPABASE_URL:", supabaseUrl);
    console.warn("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Present" : "Missing");
  }
}

// Temporary log to confirm variables load correctly
if (import.meta.env.DEV) {
  console.log("Supabase URL:", supabaseUrl);
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");