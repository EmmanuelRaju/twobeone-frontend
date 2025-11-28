import type { Document, ObjectId } from 'mongodb';
import { ObjectId as MongoObjectId } from 'mongodb';
import { getDb } from '$lib/server/db';
import bcrypt from 'bcryptjs';

// 🧱 Type definition for a User document
export interface User extends Document {
	name: string;
	email: string;
	mobile: string;
	passwordHash: string;
	createdAt: Date;
	updatedAt: Date;
}

// 🧩 MongoDB collection name
const collectionName = 'users';

// Helper to get typed collection
const getCollection = async () => {
	const db = await getDb();
	const collection = db.collection<User>(collectionName);

	// Ensure index only once
	// await collection.createIndex({ email: 1 }, { unique: true });
	return collection;
};

// 🧠 Hash password before storing
const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
};

// Register user with Lucia session
export const registerUser = async (userData: {
	name: string;
	email: string;
	mobile: string;
	password: string;
}) => {
	const users = await getCollection();

	// Check existing
	const existing = await users.findOne({ email: userData.email });
	if (existing) throw new Error('Email already exists');

	// Hash password
	const passwordHash = await bcrypt.hash(userData.password, 10);

	// Insert user
	const result = await users.insertOne({
		name: userData.name,
		email: userData.email,
		mobile: userData.mobile,
		passwordHash,
		emailVerified: false,
		createdAt: new Date(),
		updatedAt: new Date()
	});

	// Return the ObjectId directly, not as string
	return result.insertedId;
};

// Login helper
export const loginUser = async (email: string, password: string) => {
	const users = await getCollection();

	const user = await users.findOne({ email });
	if (!user) throw new Error('Invalid credentials');

	const valid = await bcrypt.compare(password, user.passwordHash);
	if (!valid) throw new Error('Invalid credentials');

	return user._id;
};

// ✅ Create a new user
export const createUser = async (
	userData: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'passwordHash'> & { password: string }
) => {
	const users = await getCollection();

	// Check for existing email
	const existing = await users.findOne({ email: userData.email });
	if (existing) throw new Error('Email already exists');

	const passwordHash = await hashPassword(userData.password);

	const user: User = {
		name: userData.name,
		email: userData.email,
		mobile: userData.mobile,
		passwordHash,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	const result = await users.insertOne(user);
	return result.insertedId;
};

// 🔍 Find user by email
export const findUserByEmail = async (email: string) => {
	const users = await getCollection();
	return users.findOne({ email });
};

// 🔍 Find user by ID
export const findUserById = async (id: string | ObjectId) => {
	const users = await getCollection();
	const _id = typeof id === 'string' ? new MongoObjectId(id) : id;
	return users.findOne({ _id });
};

// 🔒 Verify password (for login)
export const verifyPassword = async (plain: string, hash: string) => {
	return bcrypt.compare(plain, hash);
};

// 🧰 Update user
export const updateUser = async (id: string | ObjectId, updateData: Partial<User>) => {
	const users = await getCollection();
	const _id = typeof id === 'string' ? new MongoObjectId(id) : id;

	if (!updateData.updatedAt) updateData.updatedAt = new Date();
	await users.updateOne({ _id }, { $set: updateData });
	return findUserById(_id);
};

// ❌ Delete user
export const deleteUser = async (id: string | ObjectId) => {
	const users = await getCollection();
	const _id = typeof id === 'string' ? new MongoObjectId(id) : id;
	return users.deleteOne({ _id });
};

// 🔢 List users (optionally filtered)
export const listUsers = async (filter: Partial<User> = {}) => {
	const users = await getCollection();
	return users.find(filter).sort({ createdAt: -1 }).toArray();
};
