import {
	familyStatus,
	familyType,
	familyValues,
	religiousValues,
	parentsMaritalStatus
} from '$lib/data/matrimony-profile';
import { type TFamily } from '$lib/schemas';

export const familyFormFields: {
	label: string;
	name: keyof TFamily;
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
		name: 'familyType',
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
		label: "Parent's marital status",
		name: 'parentsMaritalStatus',
		type: 'select',
		options: parentsMaritalStatus
	},
	{
		label: "Father's name",
		name: 'fatherName',
		type: 'text'
	},
	{
		label: "Father's occupation",
		name: 'fatherOccupation',
		type: 'text'
	},
	{
		label: "Mother's name",
		name: 'motherName',
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
