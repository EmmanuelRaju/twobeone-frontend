<script lang="ts">
	import { goto } from '$app/navigation';
	import { Navbar } from '$lib/components';
	import { navlinks } from '$lib/data/layout/navbar';
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

<Navbar navLinks={navlinks}></Navbar>

<button class="btn" onclick={logout}>Logout</button>

<main class="prose p-5">
	<div>
		<p>Hi, XXXX</p>
		<p>ID: XXXX</p>
		<button class="btn btn-primary">Renew subscription</button>
	</div>

	<div>
		<h2>Interests received</h2>
	</div>
	<div>
		<h2>Interests sent</h2>
	</div>
	<div>
		<h2>Matched profiles</h2>
	</div>
	<div>
		<h2>Shortlisted</h2>
	</div>
	<div>
		<button class="btn btn-primary">Search profiles</button>
	</div>
</main>

<div class="p-5">
	<div class="card bg-base-100 shadow-sm card-border sm:card-side">
		<figure>
			<img
				src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
				alt="Album"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">New album is released!</h2>
			<p>Click the button to listen on Spotiwhy app.</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Listen</button>
			</div>
		</div>
	</div>
</div>
