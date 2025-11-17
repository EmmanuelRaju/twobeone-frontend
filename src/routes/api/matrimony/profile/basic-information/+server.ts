import { type RequestHandler } from '@sveltejs/kit';
import {
	updateBasicInformation,
	getProfile,
	createProfile
} from '$lib/server/services/matrimony/profile';
import { SBasicProfile } from '$lib/schemas';
import type { IMatrimonyBasicProfile } from '$lib/models';
import { apiResponse } from '$lib/server/utils/response';
import { z } from 'zod';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) return apiResponse.fail('Unauthorized user', 401);

	const userId = locals.user.id;
	const body = await request.json();

	const parsed = SBasicProfile.safeParse(body);

	if (!parsed.success) return apiResponse.fail('Invalid data', 400, z.prettifyError(parsed.error));

	let profile = await getProfile(userId);
	if (!profile) profile = await createProfile(userId);

	const updated = await updateBasicInformation(userId, parsed.data as IMatrimonyBasicProfile);

	return apiResponse.success('Data updated successfully', updated);
};
