import type { TFieldCondition } from '$lib/models';

/**
 * Check if a field is VALID (visible) based on its dependsOn rules.
 * Used by frontend (display) and backend (data cleaning).
 */
export function isFieldAllowed<TForm>(
	fieldName: keyof TForm,
	formData: TForm,
	fieldDefs: {
		[key in keyof TForm]?: { dependsOn?: TFieldCondition<TForm>[] };
	}
): boolean {
	const def = fieldDefs[fieldName];
	if (!def?.dependsOn) return true;

	for (const cond of def.dependsOn) {
		const current = formData[cond.name];

		switch (cond.type) {
			case 'equals':
				if (current !== cond.value) return false;
				break;
			case 'not-equals':
				if (current === cond.value) return false;
				break;
			case 'in':
				if (!cond.values?.includes(current)) return false;
				break;
			case 'not-in':
				if (cond.values?.includes(current)) return false;
				break;
			default:
				return true;
		}
	}

	return true;
}

/**
 * Removes fields from payload whose dependsOn conditions
 * are NOT satisfied anymore.
 */
export function cleanPayload<TForm>(
	payload: TForm,
	fieldDefs: {
		[key in keyof TForm]?: { dependsOn?: TFieldCondition<TForm>[] };
	}
): TForm {
	const cleaned: Partial<TForm> = { ...payload };

	for (const key in fieldDefs) {
		const typedKey = key as keyof TForm;
		const allowed = isFieldAllowed(typedKey, payload, fieldDefs);

		if (!allowed) {
			cleaned[typedKey] = undefined;
		}
	}

	return cleaned as TForm;
}
