import { annualIncome, education, employmentSector, occupation } from '$lib/data/matrimony-profile';
import { SEducationOccupation } from '$lib/schemas';
import type z from 'zod';

type TEducationOccupationKey = keyof z.infer<typeof SEducationOccupation>;

export const educationOccupationFormFields: {
	label: string;
	name: TEducationOccupationKey;
	type: string;
	options?: string[] | { groupName: string; children: string[] }[];
	mode?: 'multi';
}[] = [
	{
		label: 'Highest education',
		name: 'highestEducation',
		type: 'select',
		options: education
	},
	{
		label: 'College / Institution',
		name: 'college',
		type: 'text'
	},
	{
		label: 'Education in detail',
		name: 'educationInDetail',
		type: 'text'
	},
	{
		label: 'Employed in',
		name: 'employedIn',
		type: 'select',
		options: employmentSector
	},
	{
		label: 'Employer',
		name: 'employer',
		type: 'text'
	},
	{
		label: 'Occupation',
		name: 'occupation',
		type: 'select',
		options: occupation
	},
	{
		label: 'Occupation in detail',
		name: 'occupationInDetail',
		type: 'text'
	},
	{
		label: 'Annual income',
		name: 'annualIncome',
		type: 'select',
		options: annualIncome
	}
];
