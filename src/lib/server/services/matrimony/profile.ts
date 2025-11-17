import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type {
	IMatrimonyProfile,
	IMatrimonyBasicProfile,
	TMatrimonyProfileState
} from '$lib/models';
import { generatePublicId } from '$lib/server/utils/profile';
import { SBasicProfile } from '$lib/schemas';

const COLLECTION = 'matrimony_profiles';

// Get profile
export async function getProfile(userId: string | ObjectId): Promise<IMatrimonyProfile | null> {
	const db = await getDb();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;
	return db.collection<IMatrimonyProfile>(COLLECTION).findOne({ userId: _id });
}

// Create new profile
export async function createProfile(userId: string | ObjectId): Promise<IMatrimonyProfile> {
	const db = await getDb();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const profile: Omit<IMatrimonyProfile, '_id'> = {
		userId: _id,
		publicId: generatePublicId(),
		state: 'in-progress',
		createdAt: new Date(),
		updatedAt: new Date()
	};

	const result = await db.collection(COLLECTION).insertOne(profile);
	return { ...profile, _id: result.insertedId };
}

// Update Basic Information
export async function updateBasicInformation(
	userId: string | ObjectId,
	payload: IMatrimonyBasicProfile
): Promise<IMatrimonyProfile> {
	const db = await getDb();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const profile = await getProfile(_id);
	if (!profile) throw new Error('Profile not found');

	const needsReverification = profile.state === 'verified';

	const newState: TMatrimonyProfileState = needsReverification ? 'in-progress' : profile.state;

	const result = await db.collection<IMatrimonyProfile>(COLLECTION).findOneAndUpdate(
		{ userId: _id },
		{
			$set: {
				basicInformation: payload,
				state: newState,
				updatedAt: new Date()
			}
		},
		{ returnDocument: 'after' }
	);

	if (!result) throw new Error('Failed to update basic information');

	return result;
}

export function isBasicProfileComplete(data: IMatrimonyBasicProfile): boolean {
	try {
		SBasicProfile.parse(data);
		return true;
	} catch {
		return false;
	}
}
