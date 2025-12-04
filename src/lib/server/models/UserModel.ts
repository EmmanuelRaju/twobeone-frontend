import bcrypt from 'bcryptjs';

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
	console.log(userData);
	// Hash password
	// const passwordHash = await bcrypt.hash(userData.password, 10);
};

// Login helper
export const loginUser = async (email: string, password: string) => {
	console.log(email, password);
};

// ✅ Create a new user
export const createUser = async (userData: unknown) => {
	console.log(userData);
};

// 🔍 Find user by email
export const findUserByEmail = async (email: string) => {
	console.log(email);
};

// 🔍 Find user by ID
export const findUserById = async (id: string) => {
	console.log(id);
};

// 🔒 Verify password (for login)
export const verifyPassword = async (plain: string, hash: string) => {
	return bcrypt.compare(plain, hash);
};

// 🧰 Update user
export const updateUser = async (id: string, updateData: Partial<unknown>) => {
	console.log(id, updateData);
};

// ❌ Delete user
export const deleteUser = async (id: string) => {
	console.log(id);
};

// 🔢 List users (optionally filtered)
export const listUsers = async (filter: Partial<unknown> = {}) => {
	console.log(filter);
};
