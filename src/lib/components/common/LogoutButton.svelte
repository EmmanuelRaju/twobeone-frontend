<script lang="ts">
	import { goto } from '$app/navigation';
	import { toasts } from '$lib/stores/toast';

	const logout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST'
			});
			const res = await response.json();
			if (res.data.success) {
				toasts.addToast({ message: res.data.message, type: 'success' });
				await goto('/');
			} else {
				toasts.addToast({ message: res.data.message, type: 'error', autoClose: false });
			}
		} catch (error) {
			console.error(error);
			toasts.addToast({
				message: 'Something went wrong! Try again later.',
				type: 'error',
				autoClose: false
			});
		}
	};
</script>

<button class="btn" onclick={logout}>Logout</button>
