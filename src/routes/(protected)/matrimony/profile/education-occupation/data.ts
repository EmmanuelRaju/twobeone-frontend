import { annualIncome, education, employmentSector, occupation } from '$lib/data/matrimony-profile';
import type { TEducationOccupation } from '$lib/schemas';

export type TEducationOccupationFormField = {
	label: string;
	name: keyof TEducationOccupation;
	type: string;
	options?: string[] | { groupName: string; children: string[] }[];
	mode?: 'multi';
};

export const educationOccupationFormFields: TEducationOccupationFormField[] = [
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
