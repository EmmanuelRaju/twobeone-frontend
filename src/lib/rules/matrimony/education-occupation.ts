import type { TEducationOccupation } from '$lib/schemas';
import type { TFieldCondition } from '$lib/models';

export const educationOccupationRules: Partial<
	Record<keyof TEducationOccupation, { dependsOn?: TFieldCondition<TEducationOccupation>[] }>
> = {
	employer: {
		dependsOn: [
			{
				name: 'employedIn',
				type: 'in',
				values: ['Government', 'Defence', 'Private']
			}
		]
	},
	occupation: {
		dependsOn: [
			{
				name: 'employedIn',
				type: 'in',
				values: ['Government', 'Defence', 'Private']
			}
		]
	}
};
