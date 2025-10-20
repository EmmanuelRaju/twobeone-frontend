import { z } from 'zod';

export const commonRegistrationSchema = z
	.object({
		name: z.string().min(2, 'Name is required'),
		email: z.email('Enter a valid email'),
		mobile: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirm_password: z.string()
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password']
	});
