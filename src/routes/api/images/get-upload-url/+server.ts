import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_IMAGES_API_TOKEN } from '$env/static/private';
import { apiResponse } from '$lib/server/utils/response';

export async function POST() {
	const accountId = CLOUDFLARE_ACCOUNT_ID!;
	const apiToken = CLOUDFLARE_IMAGES_API_TOKEN!;

	const res = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v2/direct_upload`,
		{
			method: 'POST',
			headers: { Authorization: `Bearer ${apiToken}` }
		}
	);

	const data = await res.json();

	if (!data.success) {
		return apiResponse.fail(
			'Failed to create upload URL',
			500,
			data.errors?.[0]?.message || 'Failed to create upload URL'
		);
	}

	return apiResponse.success('Signed URL created successfully', {
		uploadURL: data.result.uploadURL,
		imageId: data.result.id
	});
}
