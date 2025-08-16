<script>
	import '../app.pcss';
	let { children } = $props();
</script>

<svelte:head>
	<title>Misc Character Sheets</title>
</svelte:head>

{@render children()}
