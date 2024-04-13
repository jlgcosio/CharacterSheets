<script lang="ts">
	import type { PageData } from './$types';
	import type { ICharacter, IWeapon } from 'libTypes/MonsterGutsTypes';

	import Weapon from 'components/monsterguts/Weapon.svelte';

	export let data: PageData;

	let characterList: ICharacter[] = data.characterList;

	$: if (dirty) {
		if (selectedCharacter) {
			characterList = characterList.map((character) => {
				return character.id === selectedCharacter.id ? selectedCharacter : character;
			});
		}
		localStorage.setItem('monster-guts', JSON.stringify(characterList));
		dirty = false;
	}

	let dirty = false;
	let selectedCharacter: ICharacter;
	$: console.log(selectedCharacter);

	if (characterList.length === 0) {
		createNewCharacter();
	}

	function createNewCharacter() {
		// Note: definte new constant instead of making defaults. Using defaults will result in same reference that will propagate to new defined characters
		const newChar: ICharacter = {
			name: 'New Character',
			img: '',
			weapons: [],
			activeWeapon: 0,
			equipment: {
				tags: []
			},
			notes: '',
			id: Date.now()
		};
		characterList = [...characterList, newChar];
		selectedCharacter = newChar;
		dirty = true;
	}

	function deleteCharacter() {
		if (selectedCharacter) {
			characterList = characterList.filter((character) => character.id !== selectedCharacter.id);
			if (characterList.length > 0) {
				selectedCharacter = characterList[0];
				dirty = true;
			} else {
				createNewCharacter();
			}
		}
	}

	function addWeapon() {
		const newWeapon: IWeapon = {
			blisters: 0,
			health: {
				current: 0,
				max: 0
			},
			crush: 0,
			slice: 0,
			pierce: 0,
			weaponName: 'New Weapon',
			weaponTags: [],
			passive: {
				name: 'Passive',
				description: 'Passive effect description'
			},
			resource: {
				current: 0,
				max: 0
			},
			resourceType: 'Edge',
			moves: []
		};
		selectedCharacter.weapons = [...selectedCharacter.weapons, newWeapon];
		dirty = true;
	}

	function deleteWeapon(index: number) {
		selectedCharacter.weapons = selectedCharacter.weapons.filter((w, i) => i !== index);
		selectedCharacter.activeWeapon = selectedCharacter.weapons.length - 1;
		dirty = true;
	}

	function updateWeapon(weapon: IWeapon, index: number) {
		selectedCharacter.weapons = selectedCharacter.weapons.map((w, i) => {
			return i === index ? weapon : w;
		});
		dirty = true;
	}
</script>

<section class="mb-5">
	<section class="flex w-full flex-row flex-wrap gap-4">
		<div class="flex-1">
			<select
				class="select select-bordered w-full"
				name="character-select"
				bind:value={selectedCharacter}
			>
				{#each characterList as character}
					<option value={character}>{character.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex-2">
			<button class="btn btn-primary" on:click={createNewCharacter}>Create new character</button>
		</div>
	</section>
</section>

{#if selectedCharacter}
	<section class="card mt-4 shadow-xl">
		<div class="card-body gap-4">
			<div class="flex flex-wrap gap-4">
				<div class="flex-1">
					<label class="form-control">
						<span>Name</span>
						<input
							type="text"
							class="input input-bordered"
							bind:value={selectedCharacter.name}
							on:change={() => (dirty = true)}
						/>
					</label>
				</div>
				<div class="flex-1">
					<label class="form-control">
						<span>Notes</span>
						<textarea
							class="textarea textarea-bordered"
							bind:value={selectedCharacter.notes}
							on:change={() => (dirty = true)}
						/>
					</label>
				</div>
			</div>

			{#if selectedCharacter.weapons.length < 4}
				<div class="mt-4 grid grid-cols-6">
					<div class="col-span-1">
						<button class="btn btn-primary" on:click={addWeapon}>Add new weapon</button>
					</div>
				</div>
			{/if}
			<div class="mt-4">
				<div role="tablist" class="tabs tabs-lifted">
					{#each selectedCharacter.weapons as weapon, index}
						<input
							type="radio"
							name="weaponTabs"
							role="tab"
							class="tab"
							aria-label={weapon.weaponName}
							on:click={() => {
								selectedCharacter.activeWeapon = index;
								dirty = true;
							}}
							checked={selectedCharacter.activeWeapon === index}
						/>
						<div role="tabpanel" class="tab-content rounded-box border-base-300 bg-base-100 p-6">
							{#if selectedCharacter.activeWeapon === index}
								<Weapon
									{weapon}
									on:change={(e) => updateWeapon(e.detail, index)}
									on:delete={() => deleteWeapon(index)}
								/>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="card-footer flex justify-end p-4">
			<button class="btn btn-error" on:click={deleteCharacter}>Delete character</button>
		</div>
	</section>
{/if}
