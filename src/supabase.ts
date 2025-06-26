import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export default (env: any) => {
  const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);
  return supabase;
};
