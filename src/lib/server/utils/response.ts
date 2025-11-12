import type { TPagination, TApiResponse } from '$lib/models';
import { json } from '@sveltejs/kit';

export const apiResponse = {
	success: <T>(message: string, data?: T, status = 200, pagination?: TPagination) =>
		json({ success: true, status, message, data, pagination } as TApiResponse<T>, { status }),

	fail: <T>(message: string, status = 400, error?: string, data?: T) =>
		json({ success: false, status, message, error, data } as TApiResponse<T>, { status }),

	serverError: (error?: Error | string) =>
		json(
			{
				success: false,
				status: 500,
				message: 'Something went wrong on our side. Please try again later.',
				error: typeof error === 'string' ? error : error?.message
			} as TApiResponse,
			{ status: 500 }
		)
};
