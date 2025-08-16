<script lang="ts">
	import type { IMonster } from '$lib/types/MonsterGutsTypes';
	import MonsterImmunity from './monster/MonsterImmunity.svelte';
	import MonsterClock from './monster/MonsterClock.svelte';
	import MonsterPart from './monster/MonsterPart.svelte';
	import MonsterMove from './monster/MonsterMove.svelte';
	import { createBlankMonsterMove, createBlankMonsterPart } from '$lib/utils/monsterguts.utils';
	type ClockType =
		| 'bleed'
		| 'fire'
		| 'ice'
		| 'metal'
		| 'shock'
		| 'slime'
		| 'snooze'
		| 'stagger'
		| 'stun'
		| 'venom'
		| 'dragon'
		| 'water'
		| 'soiled'
		| 'defensedown'
		| 'webbed';
	type ClockItem = {
		label: string;
		property: ClockType;
	};

	interface Props {
		monster: IMonster;
	}

	let { monster = $bindable() }: Props = $props();

	const clockList: ClockItem[] = [
		{
			label: 'Bleed',
			property: 'bleed'
		},
		{
			label: 'Fire',
			property: 'fire'
		},
		{
			label: 'Ice',
			property: 'ice'
		},
		{
			label: 'Metal',
			property: 'metal'
		},
		{
			label: 'Shock',
			property: 'shock'
		},
		{
			label: 'Slime',
			property: 'slime'
		},
		{
			label: 'Snooze',
			property: 'snooze'
		},
		{
			label: 'Stagger',
			property: 'stagger'
		},
		{
			label: 'Stun',
			property: 'stun'
		},
		{
			label: 'Venom',
			property: 'venom'
		},
		{
			label: 'Dragonblight',
			property: 'dragon'
		},
		{
			label: 'Waterblight',
			property: 'water'
		},
		{
			label: 'Soiled',
			property: 'soiled'
		},
		{
			label: 'Defense Down',
			property: 'defensedown'
		},
		{
			label: 'Webbed',
			property: 'webbed'
		}
	];

	function addTag() {
		monster.tags = [
			...monster.tags,
			{
				name: '',
				desciption: ''
			}
		];
	}

	function deleteTag(index: number) {
		monster.tags = monster.tags.filter((t, i) => i !== index);
	}

	function resetClock(type: ClockType) {
		monster.clocks[type].current = 0;
	}

	function addNewPart() {
		monster.parts = [...monster.parts, createBlankMonsterPart()];
	}

	function deletePart(index: number) {
		monster.parts = monster.parts.filter((t, i) => i !== index);
	}

	function addMove() {
		monster.moves = [...monster.moves, createBlankMonsterMove()];
	}

	function deleteMove(index: number) {
		monster.moves = monster.moves.filter((t, i) => i !== index);
	}

	function exportFile() {
		var a = window.document.createElement('a');
		a.href = window.URL.createObjectURL(new Blob([JSON.stringify(monster)], { type: 'text/json' }));
		a.download = `${monster.name.replaceAll(' ', '_')}.json`;

		// Append anchor to body.
		document.body.appendChild(a);
		a.click();

		// Remove anchor from body
		document.body.removeChild(a);
	}

	function updateClock(type: ClockType, values: { current: number; max: number }) {
		monster.clocks[type] = {
			...monster.clocks[type],
			...values
		};
	}

	function updateImmunity(type: ClockType, checked: boolean) {
		monster.clocks[type] = {
			...monster.clocks[type],
			immune: checked
		};
	}
</script>

<section class="collapse-arrow collapse mt-4 shadow-md">
	<input type="checkbox" />
	<div class="collapse-title flex justify-between text-xl">
		{monster.name}
	</div>
	<div class="collapse-content">
		<div class="mb-4 flex flex-wrap gap-4">
			<div class="flex-auto">
				<label class="form-control">
					<span class="label-text">Name</span>
					<input type="text" class="input input-bordered flex-auto" bind:value={monster.name} />
				</label>
			</div>
			<div class="flex items-end">
				<button class="btn" onclick={exportFile}>Export</button>
			</div>
		</div>
		<div class="flex flex-wrap gap-4">
			<label class="form-control flex-auto">
				<span class="label-text">Description</span>
				<textarea class="textarea textarea-bordered h-full" bind:value={monster.description}
				></textarea>
			</label>
			<label class="form-control flex-auto">
				<span class="label-text">Rage</span>
				<textarea class="textarea textarea-bordered h-full" bind:value={monster.rage}></textarea>
			</label>
			<div class="item-center form-control flex-auto gap-2">
				<div class="flex items-center justify-between">
					<h3>Tags</h3>
					<button class="btn" onclick={addTag}>Add Tag</button>
				</div>
				{#each monster.tags as tag, i}
					<div class="flex gap-2">
						<input
							type="text"
							class="input input-bordered"
							placeholder="Roll"
							bind:value={tag.name}
						/>
						<input
							type="text"
							class="input input-bordered flex-1"
							placeholder="Tag"
							bind:value={tag.desciption}
						/>
						<button class="btn btn-error" onclick={() => deleteTag(i)}>X</button>
					</div>
				{/each}
			</div>
		</div>
		<div class="divider"></div>

		<h3 class="text-xl">Stats</h3>
		<section class="grid grid-flow-row grid-cols-2 gap-6">
			<div class="col-span-2 flex flex-col gap-4 sm:col-span-1">
				<label class="form-control">
					<span class="label-text"><b>Body</b></span>
					<div class="join">
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={monster.body.current}
						/>
						<div class="input join-item input-bordered flex items-center justify-center p-4">
							<span>/</span>
						</div>
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={monster.body.max}
						/>
					</div>
				</label>
				<div class="form-control">
					<span class="label-text"><b>Immunities</b></span>
					<div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
						{#each clockList as clock}
							<MonsterImmunity
								label={clock.label}
								immunity={monster.clocks[clock.property].immune}
								onChange={(immunity) => updateImmunity(clock.property, immunity)}
							/>
						{/each}
					</div>
				</div>
				<div class="form-control">
					<span class="label-text"><b>Clocks</b></span>
					<div class="flex flex-wrap gap-4">
						{#each clockList as clock}
							<MonsterClock
								label={clock.label}
								current={monster.clocks[clock.property].current}
								max={monster.clocks[clock.property].max}
								onReset={() => resetClock(clock.property)}
								onChange={(e) => updateClock(clock.property, e)}
							/>
						{/each}
					</div>
				</div>
			</div>
			<div class="col-span-2 flex flex-col gap-2 sm:col-span-1">
				<div class="flex items-center justify-between">
					<span class="label-text"><b>Parts</b></span>
					<button class="btn" onclick={addNewPart}>Add new part</button>
				</div>
				{#each monster.parts as part, i}
					<MonsterPart bind:part={monster.parts[i]} remove={() => deletePart(i)} />
				{/each}

				<div class="flex items-center justify-between">
					<span class="label-text"><b>Moves</b></span>
					<button class="btn" onclick={addMove}>Add new move</button>
				</div>
				{#each monster.moves as move, i}
					<MonsterMove bind:move={monster.moves[i]} remove={() => deleteMove(i)} />
				{/each}
			</div>
		</section>
	</div>
</section>
