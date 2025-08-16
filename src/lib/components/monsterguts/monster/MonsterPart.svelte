<script lang="ts">
	interface Props {
		part: MonsterGuts.IMonsterPart;
		remove: () => void;
	}

	let { part = $bindable(), remove }: Props = $props();
</script>

<div class="flex">
	<label class="form-control mr-4">
		<span class="label-text">Broken</span>
		<div class="flex items-center justify-center">
			<input type="checkbox" class="checkbox" bind:checked={part.broken} />
		</div>
	</label>
	<div class="join">
		<input
			type="text"
			class="input join-item input-bordered"
			placeholder="Part"
			bind:value={part.name}
		/>
		<input
			type="number"
			class="input join-item input-bordered max-w-24"
			bind:value={part.values.current}
		/>
		<div class="input join-item input-bordered flex items-center justify-center p-4">
			<span>/</span>
		</div>
		<input
			type="number"
			class="input join-item input-bordered max-w-24"
			bind:value={part.values.max}
		/>
		<select class="join-item select select-bordered" bind:value={part.type}>
			<option value="Hard">Hard</option>
			<option value="Soft">Soft</option>
		</select>
	</div>
	<button class="btn btn-error ml-4" onclick={remove}>X</button>
</div>
