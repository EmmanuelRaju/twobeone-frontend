import { type RequestHandler } from '@sveltejs/kit';
import { updateContactDetails } from '$lib/server/services/matrimony/profile';
import { SContact, type TContact } from '$lib/schemas';
import { apiResponse } from '$lib/server/utils/response';
import { z } from 'zod';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) return apiResponse.fail('Unauthorized user', 401);

	const userId = locals.user.id;
	const body = await request.json();

	const parsed = SContact.safeParse(body);

	if (!parsed.success) return apiResponse.fail('Invalid data', 400, z.prettifyError(parsed.error));

	const updated = await updateContactDetails(userId, parsed.data as TContact);

	return apiResponse.success('Data updated successfully', updated);
};
