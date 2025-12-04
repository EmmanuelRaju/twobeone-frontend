// lib/server/schema.ts
import {
	pgTable,
	serial,
	varchar,
	text,
	timestamp,
	integer,
	boolean,
	jsonb,
	date,
	uuid
} from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

// ============ USERS TABLE ============
export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	name: varchar('name', { length: 100 }).notNull(),
	mobile: varchar('mobile', { length: 15 }),
	// passwordHash: varchar('password_hash', { length: 255 }).notNull(), // Removed: Supabase Auth handles this
	emailVerified: boolean('email_verified').default(false),
	lastActiveAt: timestamp('last_active_at').defaultNow(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ============ PROFILES TABLE ============
export const profiles = pgTable('profiles', {
	id: serial('id').primaryKey(),
	userId: uuid('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull()
		.unique(),

	// Basic Profile
	profileCreatedBy: varchar('profile_created_by', { length: 50 }),
	dob: date('dob').notNull(),
	maritalStatus: varchar('marital_status', { length: 50 }),
	height: varchar('height', { length: 20 }), // e.g., "5'8\""
	weight: integer('weight'),
	physicalStatus: varchar('physical_status', { length: 50 }),
	gender: varchar('gender', { length: 10 }).notNull(),
	denomination: varchar('denomination', { length: 100 }),
	division: varchar('division', { length: 100 }),
	subcaste: varchar('subcaste', { length: 100 }),
	motherTongue: varchar('mother_tongue', { length: 50 }),
	languagesKnown: jsonb('languages_known').$type<string[]>().default([]),
	eatingHabits: varchar('eating_habits', { length: 50 }),
	drinkingHabits: varchar('drinking_habits', { length: 50 }),
	smokingHabits: varchar('smoking_habits', { length: 50 }),
	aboutMe: text('about_me'),

	// Education & Occupation
	highestEducation: varchar('highest_education', { length: 100 }),
	college: varchar('college', { length: 255 }),
	educationInDetail: text('education_in_detail'),
	employedIn: varchar('employed_in', { length: 100 }),
	employer: varchar('employer', { length: 255 }),
	occupation: varchar('occupation', { length: 100 }),
	occupationInDetail: text('occupation_in_detail'),
	annualIncome: varchar('annual_income', { length: 50 }),

	// Family
	familyValue: varchar('family_value', { length: 50 }),
	familyType: varchar('family_type', { length: 50 }),
	familyStatus: varchar('family_status', { length: 50 }),
	nativePlace: varchar('native_place', { length: 255 }),
	religiousValues: varchar('religious_values', { length: 50 }),
	parentsMaritalStatus: varchar('parents_marital_status', { length: 50 }),
	fatherName: varchar('father_name', { length: 100 }),
	fatherOccupation: varchar('father_occupation', { length: 100 }),
	motherName: varchar('mother_name', { length: 100 }),
	motherOccupation: varchar('mother_occupation', { length: 100 }),
	brothersCount: integer('brothers_count').default(0),
	sistersCount: integer('sisters_count').default(0),
	aboutFamily: text('about_family'),

	// Interests & Hobbies
	hobbies: jsonb('hobbies').$type<string[]>().default([]),
	interests: jsonb('interests').$type<string[]>().default([]),
	music: jsonb('music').$type<string[]>().default([]),
	sports: jsonb('sports').$type<string[]>().default([]),
	food: jsonb('food').$type<string[]>().default([]),

	// Location
	country: varchar('country', { length: 100 }),
	state: varchar('state', { length: 100 }),
	city: varchar('city', { length: 100 }),
	citizenship: varchar('citizenship', { length: 100 }),

	// Contact (potentially redundant with users table, but keeping for profile-specific contact)
	contactEmail: varchar('contact_email', { length: 255 }),
	contactMobile: varchar('contact_mobile', { length: 15 }),
	whatsapp: varchar('whatsapp', { length: 15 }),
	instagram: varchar('instagram', { length: 255 }),
	linkedin: varchar('linkedin', { length: 255 }),
	x: varchar('x', { length: 255 }),

	// Images
	profileImage: varchar('profile_image', { length: 500 }), // Supabase Storage URL
	galleryImages: jsonb('gallery_images').$type<string[]>().default([]), // Array of URLs

	// Meta
	profileCompletion: integer('profile_completion').default(0),
	isActive: boolean('is_active').default(true),
	isVerified: boolean('is_verified').default(false),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ============ INTERESTS TABLE ============
// export const interests = pgTable('interests', {
//   id: serial('id').primaryKey(),
//   senderId: integer('sender_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
//   receiverId: integer('receiver_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
//   status: varchar('status', { length: 20 }).default('pending'), // pending, accepted, rejected
//   message: text('message'),
//   sentAt: timestamp('sent_at').defaultNow().notNull(),
//   respondedAt: timestamp('responded_at')
// });

// // ============ PROFILE VIEWS TABLE ============
// export const profileViews = pgTable('profile_views', {
//   id: serial('id').primaryKey(),
//   viewerId: integer('viewer_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
//   viewedProfileId: integer('viewed_profile_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
//   viewedAt: timestamp('viewed_at').defaultNow().notNull()
// });

// // ============ RELATIONS ============
// export const usersRelations = relations(users, ({ one, many }) => ({
//   profile: one(profiles, {
//     fields: [users.id],
//     references: [profiles.userId]
//   }),
//   interestsSent: many(interests, { relationName: 'sender' }),
//   interestsReceived: many(interests, { relationName: 'receiver' })
// }));

// export const profilesRelations = relations(profiles, ({ one }) => ({
//   user: one(users, {
//     fields: [profiles.userId],
//     references: [users.id]
//   })
// }));

// export const interestsRelations = relations(interests, ({ one }) => ({
//   sender: one(users, {
//     fields: [interests.senderId],
//     references: [users.id],
//     relationName: 'sender'
//   }),
//   receiver: one(users, {
//     fields: [interests.receiverId],
//     references: [users.id],
//     relationName: 'receiver'
//   })
// }));
