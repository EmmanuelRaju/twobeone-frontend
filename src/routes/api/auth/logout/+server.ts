// routes/(auth)/logout/+server.ts
import { apiResponse } from '$lib/server/utils/response.js';

export const POST = async ({ locals:{ supabase, safeGetSession } }) => {
	const { session } = await safeGetSession()
    if (session) {
      await supabase.auth.signOut()
    }

	return apiResponse.success('Logout successful');
};
