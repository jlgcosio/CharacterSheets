<script lang="ts">
	import Monster from 'components/monsterguts/Monster.svelte';
	import type { IClock, IMonster } from 'libTypes/MonsterGutsTypes';

	// import type { PageData } from './$types';

	// export let data: PageData;
	let monsterList: IMonster[] = [];
	let files: FileList;

	let monster: IMonster = {
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
			}
		}
	};

	async function importFiles() {
		let list: IMonster[] = [];
		if (files.length > 0) {
			for (let index = 0; index < files.length; index++) {
				const file = await files[index].text();
				const mon = JSON.parse(file) as unknown as IMonster;
				list.push(mon);
			}
			monsterList = list;
		}
	}
</script>

<section class="my-12">
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">Pick files to import</span>
		</div>
		<input
			type="file"
			class="file-input file-input-bordered w-full max-w-xs"
			accept="json"
			multiple={true}
			bind:files
			on:change={importFiles}
		/>
	</label>

	{#each monsterList as monster}
		<Monster {monster} />
	{/each}
</section>
