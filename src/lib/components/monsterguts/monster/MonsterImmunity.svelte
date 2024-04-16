<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface MonsterImmunityDispatcher {
		change: boolean;
	}

	const dispatch = createEventDispatcher<MonsterImmunityDispatcher>();

	export let label: string = '';
	export let immunity: boolean = false;
</script>

<div class="form-control col-span-1 items-center">
	<span class="label-text">{label}</span>
	<input
		type="checkbox"
		class="checkbox"
		bind:checked={immunity}
		on:change={() => dispatch('change', immunity)}
	/>
</div>
