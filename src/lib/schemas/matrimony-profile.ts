import * as DProfile from '$lib/data/matrimony-profile';
import { flattenOptions } from '$lib/utils';
import { z } from 'zod';

export const SBasicProfile = z.object({
	profileCreatedBy: z.enum(DProfile.profileCreatedBy),
	name: z.string().min(2, 'Name is required'),
	dob: z.iso.date(),
	maritalStatus: z.enum(DProfile.maritalStatus),
	heightFeet: z.number(),
	heightInches: z.number(),
	weight: z.number(),
	physicalStatus: z.enum(DProfile.physicalStatus),
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

export const SEducationOccupation = z.object({
	highestEducation: z.enum(flattenOptions(DProfile.education)),
	college: z.string().min(2, 'Details required'),
	educationInDetail: z.string().optional(),
	employedIn: z.enum(DProfile.employmentSector),
	employer: z.string().min(2, 'Details required'),
	occupation: z.enum(flattenOptions(DProfile.occupation)),
	occupationInDetail: z.string().optional(),
	annualIncome: z.enum(DProfile.annualIncome)
});

export const SFamily = z.object({
	familyValue: z.enum(DProfile.familyValues),
	familytype: z.enum(DProfile.familyType),
	familyStatus: z.enum(DProfile.familyStatus),
	nativePlace: z.string().min(2, 'Place required'),
	religiousValues: z.enum(DProfile.religiousValues),
	fatherOccupation: z.string().optional(),
	motherOccupation: z.string().optional(),
	brothersCount: z.number(),
	sistersCount: z.number(),
	aboutFamily: z.string().optional()
});
