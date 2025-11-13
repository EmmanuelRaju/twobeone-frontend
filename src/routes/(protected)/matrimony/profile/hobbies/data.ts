import { food, hobbies, interests, music, sports } from '$lib/data/matrimony-profile';
import { SInterests } from '$lib/schemas';
import type z from 'zod';

type TInterestsKey = keyof z.infer<typeof SInterests>;

export const interestsFormFields: {
	label: string;
	name: TInterestsKey;
	type: string;
	options?: string[];
	mode?: 'multi';
}[] = [
	{
		label: 'Hobbies',
		name: 'hobbies',
		type: 'select',
		options: hobbies,
		mode: 'multi'
	},
	{
		label: 'Interests',
		name: 'interests',
		type: 'select',
		options: interests,
		mode: 'multi'
	},
	{
		label: 'Music',
		name: 'music',
		type: 'select',
		options: music,
		mode: 'multi'
	},
	{
		label: 'Sports',
		name: 'sports',
		type: 'select',
		options: sports,
		mode: 'multi'
	},
	{
		label: 'Food',
		name: 'food',
		type: 'select',
		options: food,
		mode: 'multi'
	}
];
