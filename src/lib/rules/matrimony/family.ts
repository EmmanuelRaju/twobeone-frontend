import type { TFamily } from '$lib/schemas';
import type { TFieldCondition } from '$lib/models';

export const familyRules: Partial<
	Record<keyof TFamily, { dependsOn?: TFieldCondition<TFamily>[] }>
> = {
	// fatherOccupation: {
	// 	dependsOn: [
	// 		{
	// 			name: 'familyType',
	// 			type: 'not-in',
	// 			values: ['Orphan']
	// 		}
	// 	]
	// },
	// motherOccupation: {
	// 	dependsOn: [
	// 		{
	// 			name: 'familyType',
	// 			type: 'not-in',
	// 			values: ['Orphan']
	// 		}
	// 	]
	// }
};
