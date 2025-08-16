<script lang="ts">
	interface Props {
		move: MonsterGuts.IMonsterMove;
		remove: () => void;
	}

	let { move = $bindable(), remove }: Props = $props();
</script>

<div class="flex">
	<div class="join">
		<input
			type="text"
			class="input join-item input-bordered"
			placeholder="Move"
			bind:value={move.name}
		/>

		<div class="tooltip" data-tip="Harm dealt, if any">
			<input type="number" class="input join-item input-bordered max-w-16" bind:value={move.harm} />
		</div>
	</div>
	<button class="btn btn-error ml-4" onclick={remove}>X</button>
</div>
<textarea
	class="join-item textarea textarea-bordered"
	placeholder="Description"
	bind:value={move.description}
></textarea>
