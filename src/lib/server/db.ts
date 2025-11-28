import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = env.MONGODB_URI;
const dbName = env.MONGODB_DB_NAME;

if (!uri) throw new Error('Missing MONGODB_URI');
if (!dbName) throw new Error('Missing MONGODB_DB_NAME');

let client: MongoClient | null = null;
// let clientPromise: Promise<MongoClient>;

// if (!client) {
// 	client = new MongoClient(uri, {
// 		maxPoolSize: 1 // Cloudflare Workers limitation
// 	});
// 	clientPromise = client.connect();
// }

// export const getDb = async () => {
// 	const conn = await clientPromise;
// 	return conn.db(dbName);
// };

let connecting: Promise<MongoClient> | null = null;

export async function getDb() {
	// create client once
	if (!client) {
		client = new MongoClient(uri, {
			maxPoolSize: 1,
			tls: true,
			retryWrites: true
		});
	}

	// ensure connect() is only called once
	if (!connecting) {
		connecting = client.connect();
	}

	await connecting;
	return client.db(dbName);
}
