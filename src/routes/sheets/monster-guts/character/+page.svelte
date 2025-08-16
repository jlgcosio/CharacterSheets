<script lang="ts">
	import type { PageProps } from './$types';

	import Weapon from '$lib/components/monsterguts/Weapon.svelte';
	import EquipmentTag from '$lib/components/monsterguts/EquipmentTag.svelte';
	import {
		createBlankCharacter,
		createBlankEquipmentTag,
		createBlankWeapon
	} from '$lib/utils/monsterguts.utils';

	let { data }: PageProps = $props();

	let characterList: MonsterGuts.ICharacter[] = $state(data.characterList);

	$effect(() => {
		if (dirty) {
			if (selectedCharacter) {
				characterList = characterList.map((character) => {
					return character.id === selectedCharacter?.id ? selectedCharacter : character;
				});
			}
			localStorage.setItem('monster-guts', JSON.stringify(characterList));
			dirty = false;
		}
	});

	let dirty = false;
	let selectedCharacter: MonsterGuts.ICharacter | undefined = $state();
	$inspect(selectedCharacter);

	$effect(() => {
		if (characterList.length === 0) {
			createNewCharacter();
		}
	});

	function createNewCharacter() {
		// Note: definte new constant instead of making defaults. Using defaults will result in same reference that will propagate to new defined characters
		const newChar: MonsterGuts.ICharacter = createBlankCharacter();
		characterList = [...characterList, newChar];
		selectedCharacter = newChar;
		dirty = true;
	}

	function deleteCharacter() {
		if (selectedCharacter) {
			characterList = characterList.filter((character) => character.id !== selectedCharacter?.id);
			if (characterList.length > 0) {
				selectedCharacter = characterList[0];
				dirty = true;
			} else {
				createNewCharacter();
			}
		}
	}

	function addWeapon() {
		const newWeapon: MonsterGuts.IWeapon = createBlankWeapon();
		if (selectedCharacter) {
			selectedCharacter.weapons = [...selectedCharacter.weapons, newWeapon];
			selectedCharacter.activeWeapon = selectedCharacter.weapons.length - 1;
			dirty = true;
		}
	}

	function deleteWeapon(index: number) {
		if (selectedCharacter) {
			selectedCharacter.weapons = selectedCharacter.weapons.filter((w, i) => i !== index);
			selectedCharacter.activeWeapon = selectedCharacter.weapons.length - 1;
			dirty = true;
		}
	}

	function updateWeapon(weapon: MonsterGuts.IWeapon, index: number) {
		if (selectedCharacter) {
			selectedCharacter.weapons = selectedCharacter.weapons.map((w, i) => {
				return i === index ? weapon : w;
			});
			dirty = true;
		}
	}

	function addEquipmentTag() {
		if (selectedCharacter) {
			selectedCharacter.equipment.tags = [
				...selectedCharacter.equipment.tags,
				createBlankEquipmentTag()
			];
		}
	}

	function deleteEquipmentTag(index: number) {
		if (selectedCharacter) {
			selectedCharacter.equipment.tags = selectedCharacter.equipment.tags.filter(
				(t, i) => i !== index
			);
			dirty = true;
		}
	}

	function updateEquipmentTag(tag: MonsterGuts.IEquipmentTag, index: number) {
		if (selectedCharacter) {
			selectedCharacter.equipment.tags = selectedCharacter.equipment.tags.map((t, i) => {
				return i === index ? tag : t;
			});
			dirty = true;
		}
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
			<button class="btn btn-primary" onclick={createNewCharacter}>Create new character</button>
		</div>
	</section>
</section>

{#if selectedCharacter}
	<section class="card mt-4 w-full shadow-xl">
		<div class="card-body gap-4">
			<div class="flex flex-wrap gap-4">
				<div class="flex-1">
					<label class="form-control">
						<span>Name</span>
						<input
							type="text"
							class="input input-bordered"
							bind:value={selectedCharacter.name}
							onchange={() => (dirty = true)}
						/>
					</label>
				</div>
				<div class="flex-1">
					<label class="form-control">
						<span>Notes</span>
						<textarea
							class="textarea textarea-bordered"
							bind:value={selectedCharacter.notes}
							onchange={() => (dirty = true)}
						></textarea>
					</label>
				</div>
			</div>

			{#if selectedCharacter.weapons.length < 4}
				<div class="mt-4 grid grid-cols-6">
					<div class="col-span-1">
						<button class="btn btn-primary" onclick={addWeapon}>Add new weapon</button>
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
							onclick={() => {
								if (selectedCharacter) {
									selectedCharacter.activeWeapon = index;
									dirty = true;
								}
							}}
							checked={selectedCharacter.activeWeapon === index}
						/>
						<div role="tabpanel" class="tab-content rounded-box border-base-300 bg-base-100 p-6">
							{#if selectedCharacter.activeWeapon === index}
								<Weapon
									bind:weapon={selectedCharacter.weapons[index]}
									onChange={(e) => updateWeapon(e, index)}
									onDelete={() => deleteWeapon(index)}
								/>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-4">
				<div class="form-control w-full gap-4">
					<div class="flex items-center gap-4">
						<h3>Equipment Tags</h3>
						<button class="btn" onclick={addEquipmentTag}>Add Tag</button>
					</div>
					{#each selectedCharacter.equipment.tags as tag, i}
						<div class="flex flex-col flex-wrap gap-2">
							<EquipmentTag
								bind:tag={selectedCharacter.equipment.tags[i]}
								onChange={(e) => updateEquipmentTag(e, i)}
								onRemove={() => deleteEquipmentTag(i)}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="card-footer flex justify-end p-4">
			<button class="btn btn-error" onclick={deleteCharacter}>Delete character</button>
		</div>
	</section>
{/if}
