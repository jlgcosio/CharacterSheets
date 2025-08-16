<script lang="ts">
	interface Props {
		tag: MonsterGuts.IEquipmentTag;
		onChange(tag: MonsterGuts.IEquipmentTag): void;
		onRemove(): void;
	}

	let { tag = $bindable(), onChange, onRemove }: Props = $props();
	let tagCopy = $state(tag);
	let dirty = $state(false);

	// Update this list when expanding ITag:types property
	const tagOptions = ['Ephemera', 'Elemental', 'Effect', 'Equipment'];

	$effect(() => {
		if (dirty) {
			onChange(tagCopy);
			dirty = false;
		}
	});

	function toggleDirty() {
		dirty = !dirty;
	}
</script>

<div class="flex gap-2">
	{#if tagCopy.equipped !== undefined}
		<label class="form-control items-center">
			<span class="label-text">Equipped?</span>
			<input type="checkbox" class="checkbox" bind:checked={tagCopy.equipped} />
		</label>
	{/if}
	<div class="tooltip" data-tip="Equipment type is used for the weapon's basic attacks">
		<select
			class="select select-bordered"
			bind:value={tagCopy.type}
			onchange={() => {
				if (tagCopy.type === 'Equipment' || tagCopy.type === 'Ephemera') {
					tagCopy.equipped = undefined;
				} else {
					tagCopy.equipped = false;
				}
				toggleDirty();
			}}
		>
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
		onchange={toggleDirty}
	/>
	<input
		type="text"
		class="input input-bordered flex-1"
		placeholder="Tag Description"
		bind:value={tagCopy.description}
		onchange={toggleDirty}
	/>
	<button class="btn btn-error" onclick={onRemove}>X</button>
</div>
