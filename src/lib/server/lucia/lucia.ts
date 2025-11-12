// lib/server/auth.ts
import { Lucia } from 'lucia';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { getDb } from '../db';
import type { ObjectId } from 'mongodb';
// import { dev } from '$app/environment';
// import { PUBLIC_NODE_ENV } from '$env/static/public';

const db = await getDb();

const adapter = new MongodbAdapter(db.collection('sessions'), db.collection('users'));

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: false // HTTPS only in production
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			name: attributes.name,
			mobile: attributes.mobile
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			name: string;
			mobile?: string;
		};
		UserId: ObjectId;
	}
}
