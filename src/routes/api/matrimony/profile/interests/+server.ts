import { type RequestHandler } from '@sveltejs/kit';
import { updateInterests } from '$lib/server/services/matrimony/profile';
import { SInterests, type TInterests } from '$lib/schemas';
import { apiResponse } from '$lib/server/utils/response';
import { z } from 'zod';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) return apiResponse.fail('Unauthorized user', 401);

	const userId = locals.user.id;
	const body = await request.json();

	const parsed = SInterests.safeParse(body);

	if (!parsed.success) return apiResponse.fail('Invalid data', 400, z.prettifyError(parsed.error));

	const updated = await updateInterests(userId, parsed.data as TInterests);

	return apiResponse.success('Data updated successfully', updated);
};
