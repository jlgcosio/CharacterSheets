<script lang="ts">
	import Monster from 'components/monsterguts/Monster.svelte';
	import type { IMonster } from 'libTypes/MonsterGutsTypes';

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
				if (monsterList.findIndex((m) => m.id === mon.id) === -1) {
					list.push(mon);
				}
			}
			monsterList = [...monsterList, ...list];
		}
	}

	function addMonster() {
		monsterList = [
			...monsterList,
			{
				id: `monster-${Date.now()}`,
				name: '',
				description: '',
				rage: '',
				tags: [],
				moves: [],
				body: {
					current: 50,
					max: 50
				},
				parts: [],
				clocks: {
					bleed: {
						current: 0,
						max: 6,
						immune: false
					},
					fire: {
						current: 0,
						max: 6,
						immune: false
					},
					ice: {
						current: 0,
						max: 6,
						immune: false
					},
					metal: {
						current: 0,
						max: 6,
						immune: false
					},
					shock: {
						current: 0,
						max: 6,
						immune: false
					},
					slime: {
						current: 0,
						max: 6,
						immune: false
					},
					snooze: {
						current: 0,
						max: 6,
						immune: false
					},
					stagger: {
						current: 0,
						max: 6,
						immune: false
					},
					stun: {
						current: 0,
						max: 6,
						immune: false
					},
					venom: {
						current: 0,
						max: 6,
						immune: false
					},
					dragon: {
						current: 0,
						max: 6,
						immune: false
					},
					defensedown: {
						current: 0,
						max: 6,
						immune: false
					},
					water: {
						current: 0,
						max: 6,
						immune: false
					},
					webbed: {
						current: 0,
						max: 6,
						immune: false
					},
					soiled: {
						current: 0,
						max: 6,
						immune: false
					}
				}
			}
		];
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
