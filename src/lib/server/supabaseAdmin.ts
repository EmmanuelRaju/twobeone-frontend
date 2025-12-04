// lib/server/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

// Server-side Supabase client (with service role key for admin operations)
export const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY!, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
});
