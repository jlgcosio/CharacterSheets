<script lang="ts">
	import type { ITag } from 'libTypes/MonsterGutsTypes';
	import { createEventDispatcher } from 'svelte';

	interface WeaponTagsDispatch {
		change: ITag;
		remove: undefined;
	}

	const dispatch = createEventDispatcher<WeaponTagsDispatch>();

	export let tag: ITag;
	let tagCopy = tag;
	let dirty = false;

	// Update this list when expanding ITag:types property
	const tagOptions = ['Ephemera', 'Elemental', 'Effect', 'Equipment'];

	$: if (dirty) {
		dispatch('change', tagCopy);
		dirty = false;
	}

	function toggleDirty() {
		dirty = !dirty;
	}

	function deleteTag() {
		dispatch('remove');
	}
</script>

<div class="flex gap-2">
	<div class="tooltip" data-tip="Equipment type is used for the weapon's basic attacks">
		<select class="select select-bordered" bind:value={tagCopy.type} on:change={toggleDirty}>
			{#each tagOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</select>
	</div>
	<input
		type="text"
		class="input input-bordered"
		placeholder="Tag"
		bind:value={tagCopy.name}
		on:change={toggleDirty}
	/>
	<input
		type="text"
		class="input input-bordered flex-1"
		placeholder="Tag Description"
		bind:value={tagCopy.description}
		on:change={toggleDirty}
	/>
	<button class="btn btn-error" on:click={deleteTag}>X</button>
</div>
