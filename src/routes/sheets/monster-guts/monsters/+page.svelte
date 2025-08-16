<script lang="ts">
	import { createBlankMonster, shapeAsValidMonster } from '$lib/utils/monsterguts.utils';
	import Monster from '$lib/components/monsterguts/Monster.svelte';
	import type { MonsterGuts } from '$lib/types';

	let monsterList: MonsterGuts.IMonster[] = $state([]);
	let files: FileList | undefined = $state();

	async function importFiles() {
		let list: MonsterGuts.IMonster[] = [];
		if (files && files.length > 0) {
			for (let index = 0; index < files.length; index++) {
				const file = await files[index].text();
				const mon = JSON.parse(file) as unknown as MonsterGuts.IMonster;
				list.push(shapeAsValidMonster(mon));
			}
			monsterList = [...monsterList, ...list];
		}
	}

	function addMonster() {
		monsterList = [...monsterList, createBlankMonster()];
	}
</script>

<label class="form-control w-full max-w-xs">
	<div class="label">
		<span class="label-text">Import monsters or add new to the list</span>
	</div>
	<div class="flex gap-4">
		<div>
			<input
				type="file"
				class="file-input file-input-bordered"
				accept="json"
				multiple={true}
				bind:files
				onchange={importFiles}
			/>
		</div>
		<button class="btn btn-primary" onclick={addMonster}>Create new monster</button>
	</div>
</label>

{#each monsterList as monster, i}
	<Monster bind:monster={monsterList[i]} />
{/each}
