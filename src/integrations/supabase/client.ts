// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lnjvispxgkblhzhdrzdv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuanZpc3B4Z2tibGh6aGRyemR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NDg0NTMsImV4cCI6MjA2MDMyNDQ1M30.qZ0pR3nSMqu1qBCw63fonoG6YJTIAmWc2weq5eszWlY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);