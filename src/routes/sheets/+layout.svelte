<script>
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
	let { children } = $props();
</script>

<div class="flex min-h-svh justify-center">
	<div class="container py-12">
		{@render children()}
	</div>
</div>
