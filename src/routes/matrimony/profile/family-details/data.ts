import {
	familyStatus,
	familyType,
	familyValues,
	religiousValues
} from '$lib/data/matrimony-profile';
import { SFamily } from '$lib/schemas';
import type z from 'zod';

type TFamilyKey = keyof z.infer<typeof SFamily>;

export const familyFormFields: {
	label: string;
	name: TFamilyKey;
	type: string;
	options?: string[];
	mode?: 'multi';
}[] = [
	{
		label: 'Family value',
		name: 'familyValue',
		type: 'select',
		options: familyValues
	},
	{
		label: 'Family type',
		name: 'familytype',
		type: 'select',
		options: familyType
	},
	{
		label: 'Family status',
		name: 'familyStatus',
		type: 'select',
		options: familyStatus
	},
	{
		label: 'Native place',
		name: 'nativePlace',
		type: 'text'
	},
	{
		label: 'Religious values',
		name: 'religiousValues',
		type: 'select',
		options: religiousValues
	},
	{
		label: "Father's occupation",
		name: 'fatherOccupation',
		type: 'text'
	},
	{
		label: "Mother's occupation",
		name: 'motherOccupation',
		type: 'text'
	},
	{
		label: 'No. of brothers',
		name: 'brothersCount',
		type: 'number'
	},
	{
		label: 'No. of sisters',
		name: 'sistersCount',
		type: 'number'
	},
	{
		label: 'About my family',
		name: 'aboutFamily',
		type: 'textarea'
	}
];
