import { json } from '@sveltejs/kit';
import { findUserByEmail, verifyPassword } from '$lib/server/models/UserModel';

export const POST = async ({ request }) => {
	const { email, password } = await request.json();
	const user = await findUserByEmail(email);

	if (!user) return json({ error: 'Invalid credentials' }, { status: 401 });

	const valid = await verifyPassword(password, user.passwordHash);
	if (!valid) return json({ error: 'Invalid credentials' }, { status: 401 });

	return json({ success: true, user });
};
