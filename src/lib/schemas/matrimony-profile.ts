import {
	denominations,
	divisions,
	drinkingHabits,
	eatingHabits,
	languages,
	maritalStatus,
	physicalStatus,
	profileCreatedBy,
	smokingHabits
} from '$lib/data/matrimony-profile';
import { z } from 'zod';

export const SBasicProfile = z.object({
	profileCreatedBy: z.enum(profileCreatedBy),
	name: z.string().min(2, 'Name is required'),
	dob: z.iso.date(),
	maritalStatus: z.enum(maritalStatus),
	heightFeet: z.number(),
	heightInches: z.number(),
	weight: z.number(),
	physicalStatus: z.enum(physicalStatus),
	denomination: z.enum(denominations),
	division: z.enum(divisions),
	subcaste: z.string().optional(),
	motherTongue: z.enum(languages),
	languagesKnown: z.array(z.enum(languages)),
	eatingHabits: z.enum(eatingHabits),
	drinkingHabits: z.enum(drinkingHabits),
	smokingHabits: z.enum(smokingHabits),
	aboutMe: z.string()
});
