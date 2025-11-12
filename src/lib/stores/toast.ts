import { writable } from 'svelte/store';

export type TToastKind = 'success' | 'error' | 'info' | 'warning';

export type TToast = {
	id: number;
	message: string;
	type: TToastKind;
	autoClose?: boolean;
	duration?: number; // in ms
};

function createToastStore() {
	const { subscribe, update } = writable<TToast[]>([]);

	function addToast(toast: Omit<TToast, 'id'>) {
		const id = Date.now();
		const newToast: TToast = { id, duration: 3000, autoClose: true, ...toast };

		update((toasts) => [newToast, ...toasts]);

		if (newToast.autoClose) {
			setTimeout(() => {
				removeToast(id);
			}, newToast.duration);
		}
	}

	function removeToast(id: number) {
		update((toasts) => toasts.filter((t) => t.id !== id));
	}

	return { subscribe, addToast, removeToast };
}

export const toasts = createToastStore();
