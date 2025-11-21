import type { TFieldCondition } from '$lib/models';

export function showField<TForm>(
	field: { dependsOn?: TFieldCondition<TForm>[] } | undefined,
	form: TForm
): boolean {
	if (!field || !field.dependsOn) return true;

	for (const cond of field.dependsOn) {
		const value = form[cond.name];

		switch (cond.type) {
			case 'equals':
				if (value !== cond.value) return false;
				break;
			case 'not-equals':
				if (value === cond.value) return false;
				break;
			case 'in':
				if (!cond.values?.includes(value)) return false;
				break;
			case 'not-in':
				if (cond.values?.includes(value)) return false;
				break;
		}
	}

	return true;
}
