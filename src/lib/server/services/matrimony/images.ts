import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { IMatrimonyProfile } from '$lib/models';

const COLLECTION = 'matrimony_profiles';

// Helper to get typed collection with indexes
const getCollection = async () => {
	const db = await getDb();
	const collection = db.collection<IMatrimonyProfile>(COLLECTION);

	return collection;
};

export async function addImage(
	userId: string | ObjectId,
	imageId: string
): Promise<IMatrimonyProfile> {
	const collection = await getCollection();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const result = await collection.findOneAndUpdate(
		{ userId: _id },
		{
			$push: { 'images.gallery': imageId },
			$set: { 'images.updatedAt': new Date() }
		},
		{ returnDocument: 'after' }
	);

	if (!result) throw new Error('Failed to add image');

	return result;
}

export async function setProfileImage(
	userId: string | ObjectId,
	imageId: string
): Promise<IMatrimonyProfile> {
	const collection = await getCollection();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const result = await collection.findOneAndUpdate(
		{ userId: _id },
		{
			$set: {
				'images.profile': imageId,
				'images.updatedAt': new Date()
			}
		},
		{ returnDocument: 'after' }
	);

	if (!result) throw new Error('Failed to set profile image');

	return result;
}

export async function removeImage(
	userId: string | ObjectId,
	imageId: string
): Promise<IMatrimonyProfile> {
	const collection = await getCollection();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const result = await collection.findOneAndUpdate(
		{ userId: _id },
		{
			$pull: { 'images.gallery': imageId },
			$set: { 'images.updatedAt': new Date() }
		},
		{ returnDocument: 'after' }
	);

	if (!result) throw new Error('Failed to remove image');

	return result;
}
