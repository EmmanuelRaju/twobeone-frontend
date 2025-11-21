import type { TEducationOccupation } from '$lib/schemas';
import type { ObjectId } from 'mongodb';

export type TMatrimonyProfileState =
	| 'in-progress'
	| 'complete'
	| 'sent-for-verification'
	| 'verification-in-progress'
	| 'changes-requested'
	| 'verified'
	| 'rejected'
	| 'banned';

export interface IMatrimonyBasicProfile {
	profileCreatedBy: string;
	name: string;
	dob: string; // ISO date string
	maritalStatus: string;
	height: string;
	weight: number;
	physicalStatus: string;
	gender: string;
	denomination: string;
	division: string;
	subcaste?: string;
	motherTongue: string;
	languagesKnown: string[];
	eatingHabits: string;
	drinkingHabits: string;
	smokingHabits: string;
	aboutMe: string;
}

export interface IMatrimonyProfile {
	_id: ObjectId;
	userId: ObjectId;
	publicId: string;

	state: TMatrimonyProfileState;

	basicInformation?: IMatrimonyBasicProfile;
	educationOccupation?: TEducationOccupation;

	createdAt: Date;
	updatedAt: Date;
}
