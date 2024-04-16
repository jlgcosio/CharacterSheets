<script lang="ts">
	import { createBlankMonster, shapeAsValidMonster } from '$lib/utils/monsterguts.utils';
	import Monster from '$lib/components/monsterguts/Monster.svelte';
	import type { IMonster } from '$lib/types/MonsterGutsTypes';

	// import type { PageData } from './$types';

	// export let data: PageData;
	let monsterList: IMonster[] = [];
	let files: FileList;

	async function importFiles() {
		let list: IMonster[] = [];
		if (files.length > 0) {
			for (let index = 0; index < files.length; index++) {
				const file = await files[index].text();
				const mon = JSON.parse(file) as unknown as IMonster;
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
				on:change={importFiles}
			/>
		</div>
		<button class="btn btn-primary" on:click={addMonster}>Create new monster</button>
	</div>
</label>

{#each monsterList as monster}
	<Monster {monster} />
{/each}
