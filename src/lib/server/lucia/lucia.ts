// lib/server/auth.ts
import { Lucia, TimeSpan } from 'lucia';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { getDb } from '../db';
import type { ObjectId } from 'mongodb';
import { dev } from '$app/environment';

async function createLucia() {
	const db = await getDb();

	const adapter = new MongodbAdapter(db.collection('sessions'), db.collection('users'));

	return new Lucia(adapter, {
		sessionCookie: {
			attributes: {
				secure: !dev
			}
		},
		sessionExpiresIn: new TimeSpan(30, 'd'),
		getUserAttributes: (attributes) => ({
			email: attributes.email,
			name: attributes.name,
			mobile: attributes.mobile,
			lastSeen: attributes.lastSeen
		})
	});
}

// lazy singleton
let _lucia: Lucia<
	Record<never, never>,
	{
		email: string;
		name: string;
		mobile: string | undefined;
		lastSeen: Date | undefined;
	}
> | null = null;

export async function getLucia() {
	if (!_lucia) {
		_lucia = await createLucia();
	}
	return _lucia;
}

// const db = await getDb();

// const adapter = new MongodbAdapter(db.collection('sessions'), db.collection('users'));

// export const lucia = new Lucia(adapter, {
// 	sessionCookie: {
// 		attributes: {
// 			secure: !dev // HTTPS only in production
// 		}
// 	},
// 	sessionExpiresIn: new TimeSpan(30, 'd'),
// 	getUserAttributes: (attributes) => {
// 		return {
// 			email: attributes.email,
// 			name: attributes.name,
// 			mobile: attributes.mobile,
// 			lastSeen: attributes.lastSeen
// 		};
// 	}
// });

declare module 'lucia' {
	interface Register {
		Lucia: typeof _lucia;
		DatabaseUserAttributes: {
			email: string;
			name: string;
			mobile?: string;
			lastSeen?: Date;
		};
		UserId: ObjectId;
	}
}
