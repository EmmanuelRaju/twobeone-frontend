import { apiResponse } from '$lib/server/utils/response';

export async function DELETE({ params }) {
	const { imageId } = params;

	const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
	const apiToken = process.env.CLOUDFLARE_IMAGES_API_TOKEN!;

	const res = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
		{
			method: 'DELETE',
			headers: { Authorization: `Bearer ${apiToken}` }
		}
	);

	const data = await res.json();

	if (!data.success) {
		return apiResponse.fail(
			data.errors?.[0]?.message || 'Failed to delete image',
			400,
			data.errors?.[0]?.message || 'Failed to delete image'
		);
	}

	return apiResponse.success('Image deleted successfully');
}
