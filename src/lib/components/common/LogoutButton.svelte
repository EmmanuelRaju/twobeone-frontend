<script lang="ts">
	import { goto } from '$app/navigation';
	import { toasts } from '$lib/stores/toast';
	import axios from 'axios';

	const logout = async () => {
		try {
			const response = await axios.post('/api/auth/logout');
			if (response.data.success) {
				toasts.addToast({ message: response.data.message, type: 'success' });
				await goto('/');
			} else {
				toasts.addToast({ message: response.data.message, type: 'error', autoClose: false });
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
