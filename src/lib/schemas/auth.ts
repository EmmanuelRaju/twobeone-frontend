import { z } from 'zod';

export const SCommonRegistration = z
	.object({
		name: z.string().min(2, 'Name is required'),
		email: z.email('Enter a valid email'),
		mobile: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

export type TCommonRegistration = z.infer<typeof SCommonRegistration>;

export const SEmailLogin = z.object({
	email: z.email('Enter a valid email'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});

export const SForgotPassword = z.object({
	email: z.email('Enter a valid email')
});
