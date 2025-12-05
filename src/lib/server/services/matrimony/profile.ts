import type { IMatrimonyProfile, TMatrimonyProfileState } from '$lib/models';
import { generatePublicId } from '$lib/server/utils/profile';
import {
	SBasicProfile,
	SContact,
	SEducationOccupation,
	SFamily,
	SInterests,
	SLocation
} from '$lib/schemas';
import type {
	TEducationOccupation,
	TBasicProfile,
	TFamily,
	TInterests,
	TLocation,
	TContact
} from '$lib/schemas';
import { educationOccupationRules } from '$lib/rules/matrimony/education-occupation';
import { cleanPayload } from '$lib/server/utils/conditional-cleaner';
import { db } from '$lib/server/db/client';
import { profiles, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Helper to map DB row to IMatrimonyProfile
function mapRowToProfile(row: {
	user: typeof users.$inferSelect;
	profile: typeof profiles.$inferSelect;
}): IMatrimonyProfile {
	const p = row.profile;
	const u = row.user;

	// Helper to ensure string or undefined
	const str = (val: string | null | undefined) => val ?? undefined;

	// Basic Info
	const basicInformation =
		p.dob && p.gender
			? {
					profileCreatedBy: p.profileCreatedBy as any,
					name: u.name,
					dob: p.dob, // Assuming TBasicProfile.dob is string based on error
					maritalStatus: p.maritalStatus as any,
					height: p.height as any,
					weight: p.weight ?? 0,
					physicalStatus: p.physicalStatus as any,
					gender: p.gender as any,
					denomination: p.denomination as any,
					division: p.division as any,
					subcaste: str(p.subcaste),
					motherTongue: p.motherTongue as any,
					languagesKnown: (p.languagesKnown as string[]) ?? [],
					eatingHabits: p.eatingHabits as any,
					drinkingHabits: p.drinkingHabits as any,
					smokingHabits: p.smokingHabits as any,
					aboutMe: p.aboutMe ?? ''
				}
			: undefined;

	return {
		id: p.id.toString(),
		userId: p.userId,
		publicId: p.publicId,
		state: (p.isActive ? 'in-progress' : 'banned') as TMatrimonyProfileState,

		basicInformation,

		educationOccupation: {
			highestEducation: p.highestEducation as any,
			college: p.college ?? '',
			educationInDetail: str(p.educationInDetail),
			employedIn: p.employedIn as any,
			employer: str(p.employer),
			occupation: p.occupation as any,
			occupationInDetail: str(p.occupationInDetail),
			annualIncome: p.annualIncome as any
		},
		family: {
			familyValue: p.familyValue as any,
			familyType: p.familyType as any,
			familyStatus: p.familyStatus as any,
			nativePlace: p.nativePlace ?? '',
			religiousValues: p.religiousValues as any,
			parentsMaritalStatus: p.parentsMaritalStatus as any,
			fatherName: str(p.fatherName),
			fatherOccupation: str(p.fatherOccupation),
			motherName: str(p.motherName),
			motherOccupation: str(p.motherOccupation),
			brothersCount: p.brothersCount ?? 0,
			sistersCount: p.sistersCount ?? 0,
			aboutFamily: str(p.aboutFamily)
		},
		interests: {
			hobbies: (p.hobbies as string[]) ?? [],
			interests: (p.interests as string[]) ?? [],
			music: (p.music as string[]) ?? [],
			sports: (p.sports as string[]) ?? [],
			food: (p.food as string[]) ?? []
		},
		location: {
			country: p.country ?? '',
			state: p.state ?? '',
			city: p.city ?? '',
			citizenship: p.citizenship ?? ''
		},
		contact: {
			email: p.contactEmail ?? u.email,
			mobile: p.contactMobile ?? u.mobile ?? '',
			whatsapp: str(p.whatsapp),
			instagram: str(p.instagram),
			linkedin: str(p.linkedin),
			x: str(p.x)
		},
		images: {
			profile: str(p.profileImage),
			gallery: (p.galleryImages as string[]) ?? [],
			updatedAt: p.updatedAt
		},

		createdAt: p.createdAt,
		updatedAt: p.updatedAt
	};
}

// Get profile
export async function getProfile(userId: string): Promise<IMatrimonyProfile | null> {
	const result = await db
		.select({
			user: users,
			profile: profiles
		})
		.from(profiles)
		.innerJoin(users, eq(profiles.userId, users.id))
		.where(eq(profiles.userId, userId));

	if (result.length === 0) return null;
	return mapRowToProfile(result[0]);
}

// Create new profile
export async function createProfile(userId: string): Promise<IMatrimonyProfile> {
	const existing = await getProfile(userId);
	if (existing) return existing;

	const [newProfile] = await db
		.insert(profiles)
		.values({
			userId,
			publicId: generatePublicId(),
			gender: 'male',
			dob: new Date().toISOString().split('T')[0] // YYYY-MM-DD
		})
		.returning();

	const [user] = await db.select().from(users).where(eq(users.id, userId));
	if (!user) throw new Error('User not found');

	return mapRowToProfile({ user, profile: newProfile });
}

async function getUser(userId: string) {
	const [user] = await db.select().from(users).where(eq(users.id, userId));
	if (!user) throw new Error('User not found');
	return user;
}

export async function updateBasicInformation(
	userId: string,
	payload: TBasicProfile
): Promise<IMatrimonyProfile> {
	const [updated] = await db
		.update(profiles)
		.set({
			profileCreatedBy: payload.profileCreatedBy,
			dob: payload.dob, // string
			maritalStatus: payload.maritalStatus,
			height: payload.height,
			weight: payload.weight,
			physicalStatus: payload.physicalStatus,
			gender: payload.gender,
			denomination: payload.denomination,
			division: payload.division,
			subcaste: payload.subcaste,
			motherTongue: payload.motherTongue,
			languagesKnown: payload.languagesKnown,
			eatingHabits: payload.eatingHabits,
			drinkingHabits: payload.drinkingHabits,
			smokingHabits: payload.smokingHabits,
			aboutMe: payload.aboutMe,
			updatedAt: new Date()
		})
		.where(eq(profiles.userId, userId))
		.returning();

	const user = await getUser(userId);
	return mapRowToProfile({ user, profile: updated });
}

export function isBasicProfileComplete(data: TBasicProfile): boolean {
	try {
		SBasicProfile.parse(data);
		return true;
	} catch {
		return false;
	}
}

export async function updateEducationOccupation(
	userId: string,
	payload: TEducationOccupation
): Promise<IMatrimonyProfile> {
	// Clean payload based on conditional rules
	const cleanedPayload = cleanPayload(payload, educationOccupationRules);

	const [updated] = await db
		.update(profiles)
		.set({
			highestEducation: cleanedPayload.highestEducation,
			college: cleanedPayload.college,
			educationInDetail: cleanedPayload.educationInDetail,
			employedIn: cleanedPayload.employedIn,
			employer: cleanedPayload.employer,
			occupation: cleanedPayload.occupation,
			occupationInDetail: cleanedPayload.occupationInDetail,
			annualIncome: cleanedPayload.annualIncome,
			updatedAt: new Date()
		})
		.where(eq(profiles.userId, userId))
		.returning();

	const user = await getUser(userId);
	return mapRowToProfile({ user, profile: updated });
}

export function isEducationOccupationComplete(data: TEducationOccupation): boolean {
	try {
		SEducationOccupation.parse(data);
		return true;
	} catch {
		return false;
	}
}

export async function updateFamilyInformation(
	userId: string,
	payload: TFamily
): Promise<IMatrimonyProfile> {
	const [updated] = await db
		.update(profiles)
		.set({
			familyValue: payload.familyValue,
			familyType: payload.familyType,
			familyStatus: payload.familyStatus,
			nativePlace: payload.nativePlace,
			religiousValues: payload.religiousValues,
			parentsMaritalStatus: payload.parentsMaritalStatus,
			fatherName: payload.fatherName,
			fatherOccupation: payload.fatherOccupation,
			motherName: payload.motherName,
			motherOccupation: payload.motherOccupation,
			brothersCount: payload.brothersCount,
			sistersCount: payload.sistersCount,
			aboutFamily: payload.aboutFamily,
			updatedAt: new Date()
		})
		.where(eq(profiles.userId, userId))
		.returning();

	const user = await getUser(userId);
	return mapRowToProfile({ user, profile: updated });
}

export function isFamilyComplete(data: TFamily): boolean {
	try {
		SFamily.parse(data);
		return true;
	} catch {
		return false;
	}
}

export async function updateInterests(
	userId: string,
	payload: TInterests
): Promise<IMatrimonyProfile> {
	const [updated] = await db
		.update(profiles)
		.set({
			hobbies: payload.hobbies,
			interests: payload.interests,
			music: payload.music,
			sports: payload.sports,
			food: payload.food,
			updatedAt: new Date()
		})
		.where(eq(profiles.userId, userId))
		.returning();

	const user = await getUser(userId);
	return mapRowToProfile({ user, profile: updated });
}

export function isInterestsComplete(data: TInterests): boolean {
	try {
		SInterests.parse(data);
		return true;
	} catch {
		return false;
	}
}

export async function updateLocation(
	userId: string,
	payload: TLocation
): Promise<IMatrimonyProfile> {
	const [updated] = await db
		.update(profiles)
		.set({
			country: payload.country,
			state: payload.state,
			city: payload.city,
			citizenship: payload.citizenship,
			updatedAt: new Date()
		})
		.where(eq(profiles.userId, userId))
		.returning();

	const user = await getUser(userId);
	return mapRowToProfile({ user, profile: updated });
}

export function isLocationComplete(data: TLocation): boolean {
	try {
		SLocation.parse(data);
		return true;
	} catch {
		return false;
	}
}

export async function updateContactDetails(
	userId: string,
	payload: TContact
): Promise<IMatrimonyProfile> {
	const [updated] = await db
		.update(profiles)
		.set({
			contactEmail: payload.email,
			contactMobile: payload.mobile,
			whatsapp: payload.whatsapp,
			instagram: payload.instagram,
			linkedin: payload.linkedin,
			x: payload.x,
			updatedAt: new Date()
		})
		.where(eq(profiles.userId, userId))
		.returning();

	const user = await getUser(userId);
	return mapRowToProfile({ user, profile: updated });
}

export function isContactComplete(data: TContact): boolean {
	try {
		SContact.parse(data);
		return true;
	} catch {
		return false;
	}
}
