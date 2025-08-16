<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let count = $state(5);

	onMount(() => {
		const countdown = setInterval(() => {
			count--;
		}, 1000);

		setTimeout(() => {
			clearInterval(countdown);
			goto(page.url.origin);
		}, 5000);
	});
</script>

<main class="flex h-full justify-center">
	<div class="container flex h-full flex-col items-center justify-center gap-8">
		<h1>{page.status}: {page.error?.message}</h1>
		<p>You will be redirected to the home page in {count} second{count === 1 ? '' : 's'}</p>
	</div>
</main>
