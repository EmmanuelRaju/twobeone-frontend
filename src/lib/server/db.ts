import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = env.MONGODB_URI;
const dbName = env.MONGODB_DB_NAME;

if (!uri) throw new Error('Missing MONGODB_URI');
if (!dbName) throw new Error('Missing MONGODB_DB_NAME');

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!client) {
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

export const getDb = async () => {
	const conn = await clientPromise;
	return conn.db(dbName);
};
