// src/hooks.server.ts
import { lucia } from '$lib/server/lucia/lucia';
import type { Handle } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { building } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	if (building) {
		return resolve(event);
	}
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	try {
		// console.log('Hook: Validating session with ID:', sessionId);
		const response = await lucia.validateSession(sessionId);
		const { session, user } = response;

		// console.log('RESPONSE', response);

		// console.log('Hook: Session validation result:', { session: session?.id, user: user?.email });

		if (session) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
			event.locals.user = JSON.parse(JSON.stringify(user));
			event.locals.session = JSON.parse(JSON.stringify(session));

			//Em: For tracking last seen
			const db = await getDb();
			const now = new Date();
			if (!user.lastSeen || now.getTime() - new Date(user.lastSeen).getTime() > 60_000) {
				await db
					.collection('users')
					.updateOne({ _id: new ObjectId(user.id) }, { $set: { lastSeen: now } });
			}
		} else {
			// console.log('Hook: No session found for ID:', sessionId);
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
			event.locals.user = null;
			event.locals.session = null;
		}
	} catch (error) {
		console.error('Hook: Error validating session:', error);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});
		event.locals.user = null;
		event.locals.session = null;
	}

	return resolve(event);
};
