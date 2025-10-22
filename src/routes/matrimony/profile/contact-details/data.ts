import { SContact } from '$lib/schemas';
import type z from 'zod';

type TContactKey = keyof z.infer<typeof SContact>;

export const contactFormFields: {
	label: string;
	name: TContactKey;
	type: string;
}[] = [
	{
		label: 'Email',
		name: 'email',
		type: 'email'
	},
	{
		label: 'Mobile',
		name: 'mobile',
		type: 'tel'
	},
	{
		label: 'WhatsApp',
		name: 'whatsapp',
		type: 'tel'
	},
	{
		label: 'Instagram',
		name: 'instagram',
		type: 'url'
	},
	{
		label: 'LinkedIn',
		name: 'linkedin',
		type: 'url'
	},
	{
		label: 'X (Twitter)',
		name: 'x',
		type: 'url'
	}
];
