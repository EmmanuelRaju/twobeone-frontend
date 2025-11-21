import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type {
	IMatrimonyProfile,
	IMatrimonyBasicProfile,
	TMatrimonyProfileState
} from '$lib/models';
import { generatePublicId } from '$lib/server/utils/profile';
import { SBasicProfile, SEducationOccupation, type TEducationOccupation } from '$lib/schemas';
import { educationOccupationRules } from '$lib/rules/matrimony/education-occupation';
import { cleanPayload } from '$lib/server/utils/conditional-cleaner';

const COLLECTION = 'matrimony_profiles';

// Helper to get typed collection with indexes
const getCollection = async () => {
	const db = await getDb();
	const collection = db.collection<IMatrimonyProfile>(COLLECTION);

	// Ensure indexes
	await collection.createIndex({ userId: 1 });
	await collection.createIndex({ publicId: 1 }, { unique: true });
	return collection;
};

// Get profile
export async function getProfile(userId: string | ObjectId): Promise<IMatrimonyProfile | null> {
	const collection = await getCollection();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;
	return collection.findOne({ userId: _id });
}

// Create new profile
export async function createProfile(userId: string | ObjectId): Promise<IMatrimonyProfile> {
	const collection = await getCollection();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const profile: Omit<IMatrimonyProfile, '_id'> = {
		userId: _id,
		publicId: generatePublicId(),
		state: 'in-progress',
		createdAt: new Date(),
		updatedAt: new Date()
	};

	const result = await collection.insertOne(profile as unknown as IMatrimonyProfile);
	return { ...profile, _id: result.insertedId } as IMatrimonyProfile;
}

// Update Basic Information
export async function updateBasicInformation(
	userId: string | ObjectId,
	payload: IMatrimonyBasicProfile
): Promise<IMatrimonyProfile> {
	const collection = await getCollection();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const profile = await getProfile(_id);
	if (!profile) throw new Error('Profile not found');

	const needsReverification = profile.state === 'verified';

	const newState: TMatrimonyProfileState = needsReverification ? 'in-progress' : profile.state;

	const result = await collection.findOneAndUpdate(
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

// Update Basic Information
export async function updateEducationOccupation(
	userId: string | ObjectId,
	payload: TEducationOccupation
): Promise<IMatrimonyProfile> {
	const collection = await getCollection();
	const _id = typeof userId === 'string' ? new ObjectId(userId) : userId;

	const profile = await getProfile(_id);
	if (!profile) throw new Error('Profile not found');

	const needsReverification = profile.state === 'verified';

	const newState: TMatrimonyProfileState = needsReverification ? 'in-progress' : profile.state;

	const cleaned = cleanPayload(payload, educationOccupationRules);

	const result = await collection.findOneAndUpdate(
		{ userId: _id },
		{
			$set: {
				educationOccupation: cleaned,
				state: newState,
				updatedAt: new Date()
			}
		},
		{ returnDocument: 'after' }
	);

	if (!result) throw new Error('Failed to education/occupation information');

	return result;
}

export function isEducationOccupationComplete(data: TEducationOccupation): boolean {
	try {
		SEducationOccupation.parse(data);
		return true;
	} catch {
		return false;
	}
}
