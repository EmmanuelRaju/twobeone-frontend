import type { TEducationOccupation, TBasicProfile, TFamily } from '$lib/schemas';
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

export interface IMatrimonyProfile {
	_id: ObjectId;
	userId: ObjectId;
	publicId: string;

	state: TMatrimonyProfileState;

	basicInformation?: TBasicProfile;
	educationOccupation?: TEducationOccupation;
	family?: TFamily;

	createdAt: Date;
	updatedAt: Date;
}
