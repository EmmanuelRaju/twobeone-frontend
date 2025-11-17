export function generatePublicId(): string {
	// Generate 4 random bytes and convert to a number between 1,000,000 and 9,999,999
	const randomBytes = crypto.getRandomValues(new Uint8Array(4));
	const randomNum = new DataView(randomBytes.buffer).getUint32(0);
	const num = (randomNum % 9000000) + 1000000;
	return `2B1${num}`;
}
