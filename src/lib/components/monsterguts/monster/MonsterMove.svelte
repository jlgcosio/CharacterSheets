<script lang="ts">
	import type { IMonsterMove, IMonsterPart } from 'libTypes/MonsterGutsTypes';
	import { createEventDispatcher } from 'svelte';

	interface MonsterPartDispatch {
		remove: undefined;
	}

	const dispatch = createEventDispatcher<MonsterPartDispatch>();

	export let move: IMonsterMove;
</script>

<div class="flex">
	<div class="join">
		<input
			type="text"
			class="input join-item input-bordered"
			placeholder="Move"
			bind:value={move.name}
		/>
		<input
			type="text"
			class="input join-item input-bordered"
			placeholder="Description"
			bind:value={move.description}
		/>
		<div class="tooltip" data-tip="Harm dealt, if any">
			<input type="number" class="input join-item input-bordered" bind:value={move.harm} />
		</div>
	</div>
	<button class="btn btn-error ml-4" on:click={() => dispatch('remove')}>X</button>
</div>
