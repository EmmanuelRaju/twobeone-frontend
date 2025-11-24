import * as DProfile from '$lib/data/matrimony-profile';
import { flattenOptions } from '$lib/utils';
import { z } from 'zod';

export const SBasicProfile = z.object({
	profileCreatedBy: z.enum(DProfile.profileCreatedBy),
	name: z.string().min(2, 'Name is required'),
	dob: z.iso.date(),
	maritalStatus: z.enum(DProfile.maritalStatus),
	height: z.enum(DProfile.heights),
	weight: z.number(),
	physicalStatus: z.enum(DProfile.physicalStatus),
	gender: z.enum(DProfile.gender),
	denomination: z.enum(DProfile.denominations),
	division: z.enum(DProfile.divisions),
	subcaste: z.string().optional(),
	motherTongue: z.enum(DProfile.languages),
	languagesKnown: z.array(z.enum(DProfile.languages)),
	eatingHabits: z.enum(DProfile.eatingHabits),
	drinkingHabits: z.enum(DProfile.drinkingHabits),
	smokingHabits: z.enum(DProfile.smokingHabits),
	aboutMe: z.string()
});

export type TBasicProfile = z.infer<typeof SBasicProfile>;

export const SEducationOccupation = z.object({
	highestEducation: z.enum(flattenOptions(DProfile.education)),
	college: z.string().min(2, 'Details required'),
	educationInDetail: z.string().optional(),
	employedIn: z.enum(DProfile.employmentSector),
	employer: z.string().min(2, 'Details required').optional(),
	occupation: z.enum(flattenOptions(DProfile.occupation)).optional(),
	occupationInDetail: z.string().optional(),
	annualIncome: z.enum(DProfile.annualIncome)
});

export type TEducationOccupation = z.infer<typeof SEducationOccupation>;

export const SFamily = z.object({
	familyValue: z.enum(DProfile.familyValues),
	familyType: z.enum(DProfile.familyType),
	familyStatus: z.enum(DProfile.familyStatus),
	nativePlace: z.string().min(2, 'Place required'),
	religiousValues: z.enum(DProfile.religiousValues),
	parentsMaritalStatus: z.enum(DProfile.parentsMaritalStatus),
	fatherName: z.string().optional(),
	fatherOccupation: z.string().optional(),
	motherName: z.string().optional(),
	motherOccupation: z.string().optional(),
	brothersCount: z.number(),
	sistersCount: z.number(),
	aboutFamily: z.string().optional()
});

export type TFamily = z.infer<typeof SFamily>;

export const SInterests = z.object({
	hobbies: z.array(z.enum(DProfile.hobbies)),
	interests: z.array(z.enum(DProfile.interests)),
	music: z.array(z.enum(DProfile.music)),
	sports: z.array(z.enum(DProfile.sports)),
	food: z.array(z.enum(DProfile.food))
});

export type TInterests = z.infer<typeof SInterests>;

export const SLocation = z.object({
	country: z.string().min(1, 'Country is required'),
	state: z.string().min(1, 'State is required'),
	city: z.string().min(1, 'City is required'),
	citizenship: z.string().min(1, 'Citizenship is required')
});

export type TLocation = z.infer<typeof SLocation>;

export const SContact = z.object({
	email: z.email('Enter a valid email'),
	mobile: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number'),
	whatsapp: z
		.string()
		.refine((val) => val === '' || /^[0-9]{10}$/.test(val), 'Enter a valid 10-digit mobile number')
		.optional(),
	instagram: z
		.string()
		.refine(
			(val) => val === '' || z.url({ hostname: /^instagram\.com$/ }).safeParse(val).success,
			'Enter a valid Instagram URL'
		)
		.optional(),
	linkedin: z
		.string()
		.refine(
			(val) => val === '' || z.url({ hostname: /^linkedin\.com$/ }).safeParse(val).success,
			'Enter a valid LinkedIn URL'
		)
		.optional(),
	x: z
		.string()
		.refine(
			(val) => val === '' || z.url({ hostname: /^x\.com$/ }).safeParse(val).success,
			'Enter a valid X URL'
		)
		.optional()
});

export type TContact = z.infer<typeof SContact>;

export type TProfileImages = {
	profile?: string;
	gallery: string[];
	updatedAt: Date;
};
