<script lang="ts">
	import type { IMonster, IMonsterTag } from 'libTypes/MonsterGutsTypes';
	import MonsterImmunity from './monster/MonsterImmunity.svelte';
	import MonsterClock from './monster/MonsterClock.svelte';
	import MonsterPart from './monster/MonsterPart.svelte';
	import MonsterMove from './monster/MonsterMove.svelte';
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
		| 'venom';

	export let monster: IMonster;

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
		monster.parts = [
			...monster.parts,
			{
				name: '',
				broken: false,
				type: 'Hard',
				values: {
					current: 0,
					max: 0
				}
			}
		];
	}

	function deletePart(index: number) {
		monster.parts = monster.parts.filter((t, i) => i !== index);
	}

	function addMove() {
		monster.moves = [
			...monster.moves,
			{
				name: '',
				description: '',
				harm: 0
			}
		];
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
</script>

<section class="card mt-4 flex flex-col flex-wrap gap-4 shadow-xl">
	<div class="card-body max-w-full">
		<div class="flex flex-wrap gap-4">
			<div class="flex-auto">
				<label class="form-control">
					<span class="label-text">Name</span>
					<input type="text" class="input input-bordered flex-auto" bind:value={monster.name} />
				</label>
			</div>
			<div class="flex items-end">
				<button class="btn" on:click={exportFile}>Export</button>
			</div>
		</div>
		<div class="flex flex-wrap gap-4">
			<label class="form-control flex-auto">
				<span class="label-text">Description</span>
				<textarea class="textarea textarea-bordered h-full" bind:value={monster.description} />
			</label>
			<label class="form-control flex-auto">
				<span class="label-text">Rage</span>
				<textarea class="textarea textarea-bordered h-full" bind:value={monster.rage} />
			</label>
			<div class="item-center form-control flex-auto gap-2">
				<div class="flex items-center justify-between">
					<h3>Tags</h3>
					<button class="btn" on:click={addTag}>Add Tag</button>
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
						<button class="btn btn-error" on:click={() => deleteTag(i)}>X</button>
					</div>
				{/each}
			</div>
		</div>
		<div class="divider"></div>

		<h3>Stats</h3>
		<section class="flex flex-wrap gap-4 md:flex-nowrap">
			<div class="flex flex-auto flex-col gap-4">
				<label class="form-control">
					<span class="label-text">Body</span>
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
					<span class="label-text">Immunities</span>
					<div class="flex gap-6">
						<MonsterImmunity label="Bleed" immunity={monster.clocks.bleed.immune} />
						<MonsterImmunity label="Fire" immunity={monster.clocks.fire.immune} />
						<MonsterImmunity label="Ice" immunity={monster.clocks.ice.immune} />
						<MonsterImmunity label="Metal" immunity={monster.clocks.metal.immune} />
						<MonsterImmunity label="Shock" immunity={monster.clocks.shock.immune} />
						<MonsterImmunity label="Slime" immunity={monster.clocks.slime.immune} />
						<MonsterImmunity label="Snooze" immunity={monster.clocks.snooze.immune} />
						<MonsterImmunity label="Stagger" immunity={monster.clocks.stagger.immune} />
						<MonsterImmunity label="Stun" immunity={monster.clocks.stun.immune} />
						<MonsterImmunity label="Venom" immunity={monster.clocks.venom.immune} />
					</div>
				</div>
				<div class="form-control">
					<span class="label-text">Clocks</span>
					<div class="flex flex-wrap gap-4">
						<MonsterClock
							label="Bleed"
							current={monster.clocks.bleed.current}
							max={monster.clocks.bleed.max}
							on:reset={() => resetClock('bleed')}
						/>
						<MonsterClock
							label="Fire"
							current={monster.clocks.fire.current}
							max={monster.clocks.ice.max}
							on:reset={() => resetClock('fire')}
						/>
						<MonsterClock
							label="Ice"
							current={monster.clocks.ice.current}
							max={monster.clocks.ice.max}
							on:reset={() => resetClock('ice')}
						/>
						<MonsterClock
							label="Metal"
							current={monster.clocks.metal.current}
							max={monster.clocks.metal.max}
							on:reset={() => resetClock('metal')}
						/>
						<MonsterClock
							label="Shock"
							current={monster.clocks.shock.current}
							max={monster.clocks.shock.max}
							on:reset={() => resetClock('shock')}
						/>
						<MonsterClock
							label="Slime"
							current={monster.clocks.slime.current}
							max={monster.clocks.slime.max}
							on:reset={() => resetClock('slime')}
						/>
						<MonsterClock
							label="Snooze"
							current={monster.clocks.snooze.current}
							max={monster.clocks.snooze.max}
							on:reset={() => resetClock('snooze')}
						/>
						<MonsterClock
							label="Stagger"
							current={monster.clocks.stagger.current}
							max={monster.clocks.stagger.max}
							on:reset={() => resetClock('stagger')}
						/>
						<MonsterClock
							label="Stun"
							current={monster.clocks.stun.current}
							max={monster.clocks.stun.max}
							on:reset={() => resetClock('stun')}
						/>
						<MonsterClock
							label="Venom"
							current={monster.clocks.venom.current}
							max={monster.clocks.venom.max}
							on:reset={() => resetClock('venom')}
						/>
					</div>
				</div>
			</div>
			<div class="divider divider-horizontal"></div>
			<div class="flex flex-auto flex-col gap-2">
				<div class="flex items-center justify-between">
					<span class="label-text">Parts</span>
					<button class="btn" on:click={addNewPart}>Add new part</button>
				</div>
				{#each monster.parts as part, i}
					<MonsterPart {part} on:remove={() => deletePart(i)} />
				{/each}

				<div class="flex items-center justify-between">
					<span class="label-text">Moves</span>
					<button class="btn" on:click={addMove}>Add new move</button>
				</div>
				{#each monster.moves as move, i}
					<MonsterMove {move} on:remove={() => deleteMove(i)} />
				{/each}
			</div>
		</section>
	</div>
</section>
