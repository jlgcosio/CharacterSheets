<script lang="ts">
	import Monster from 'components/monsterguts/Monster.svelte';
	import type { IClock, IMonster } from 'libTypes/MonsterGutsTypes';

	// import type { PageData } from './$types';

	// export let data: PageData;
	let monsterList: IMonster[] = [];

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
</script>

<section class="my-12">
	<Monster {monster} />
</section>
