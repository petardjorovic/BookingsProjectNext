import { Database } from "@/app/_lib/database.types";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/app/utils/config";

export const supabase = createClient<Database>(
  config.SUPABASE_URL,
  config.SUPABASE_KEY
);
