<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	interface MonsterClockDispatch {
		reset: undefined;
	}

	const dispatch = createEventDispatcher<MonsterClockDispatch>();
	export let label: string = '';
	export let current: number = 6;
	export let max: number = 6;
</script>

<label class="form-control">
	<span class="label-text">{label}</span>
	<div class=" flex gap-2">
		<div class="join">
			<input type="number" class="input join-item input-bordered max-w-48" bind:value={current} />
			<div class="input join-item input-bordered flex items-center justify-center p-4">
				<span>/</span>
			</div>
			<input type="number" class="input join-item input-bordered max-w-48" bind:value={max} />
			<button class="btn join-item" on:click={() => dispatch('reset')}>Reset</button>
		</div>
	</div>
</label>
