import {
	denominations,
	divisions,
	drinkingHabits,
	eatingHabits,
	gender,
	heights,
	languages,
	maritalStatus,
	physicalStatus,
	profileCreatedBy,
	smokingHabits
} from '$lib/data/matrimony-profile';
import { SBasicProfile } from '$lib/schemas';
import type z from 'zod';

type TBasicProfileKey = keyof z.infer<typeof SBasicProfile>;

export const basicProfileFormFields: {
	label: string;
	name: TBasicProfileKey;
	type: string;
	options?: string[];
	mode?: 'multi';
}[] = [
	{
		label: 'Profile created by',
		name: 'profileCreatedBy',
		type: 'select',
		options: profileCreatedBy
	},
	{
		label: 'Full name',
		name: 'name',
		type: 'text'
	},
	{
		label: 'Date of birth',
		name: 'dob',
		type: 'date'
	},
	{
		label: 'Marital status',
		name: 'maritalStatus',
		type: 'select',
		options: maritalStatus
	},
	{
		label: 'Height',
		name: 'height',
		type: 'select',
		options: heights
	},
	{
		label: 'Weight (kgs)',
		name: 'weight',
		type: 'number'
	},
	{
		label: 'Gender',
		name: 'gender',
		type: 'select',
		options: gender
	},
	{
		label: 'Physical status',
		name: 'physicalStatus',
		type: 'select',
		options: physicalStatus
	},
	{
		label: 'Denomination',
		name: 'denomination',
		type: 'select',
		options: denominations
	},
	{
		label: 'Division',
		name: 'division',
		type: 'select',
		options: divisions
	},
	{
		label: 'Subcaste',
		name: 'subcaste',
		type: 'text'
	},
	{
		label: 'Mother tongue',
		name: 'motherTongue',
		type: 'select',
		options: languages
	},
	{
		label: 'Languages known',
		name: 'languagesKnown',
		type: 'select',
		options: languages,
		mode: 'multi'
	},
	{
		label: 'Eating habits',
		name: 'eatingHabits',
		type: 'select',
		options: eatingHabits
	},
	{
		label: 'Drinking habits',
		name: 'drinkingHabits',
		type: 'select',
		options: drinkingHabits
	},
	{
		label: 'Smoking habits',
		name: 'smokingHabits',
		type: 'select',
		options: smokingHabits
	},
	{
		label: 'About me',
		name: 'aboutMe',
		type: 'textarea'
	}
];
