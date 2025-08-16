<script lang="ts">
	import type { MonsterGuts } from '$lib/types';
	import WeaponTag from '$lib/components/monsterguts/WeaponTag.svelte';
	import { createBlankEquipmentTag } from '$lib/utils/monsterguts.utils';

	interface Props {
		weapon: MonsterGuts.IWeapon;
		onChange: (weapon: MonsterGuts.IWeapon) => void;
		onDelete: () => void;
	}

	let { weapon = $bindable(), onChange, onDelete }: Props = $props();
	let dirty = $state(false);

	$effect(() => {
		if (dirty) {
			onChange(weapon);
			dirty = false;
		}
	});

	// Update this list when expanding IWeapon:resourceTypes property
	const resourceTypes = ['Edge', 'Ammo', 'Melody'];

	function removeWeapon() {
		onDelete();
	}

	function toggleDirty() {
		dirty = !dirty;
	}

	function resetHp() {
		weapon.health.current = weapon.health.max;
		dirty = true;
	}

	function resetResource() {
		weapon.resource.current = weapon.resource.max;
		dirty = true;
	}

	function addTag() {
		weapon.weaponTags = [...weapon.weaponTags, createBlankEquipmentTag()];
	}

	function deleteTag(index: number) {
		weapon.weaponTags = weapon.weaponTags.filter((t, i) => i !== index);
		dirty = true;
	}

	function updateTag(tag: MonsterGuts.IEquipmentTag, index: number) {
		weapon = {
			...weapon,
			weaponTags: weapon.weaponTags.map((t, i) => {
				return i === index ? tag : t;
			})
		};
		dirty = true;
	}
</script>

<div class="flex flex-col gap-2 p-4">
	<div class="flex flex-row flex-wrap gap-2">
		<div class="flex w-full flex-wrap items-center gap-4">
			<input
				type="text"
				class="input input-bordered flex-1"
				placeholder="Weapon name"
				bind:value={weapon.weaponName}
				onchange={toggleDirty}
			/>
			<button class="btn btn-warning" onclick={removeWeapon}>Delete</button>
		</div>
	</div>
	<div class="flex flex-col flex-wrap gap-4 xl:flex-row">
		<div class="flex flex-1 flex-col flex-wrap gap-2">
			<label class="form-control">
				<span class="inline">Health</span>
				<div class="flex gap-2">
					<div class="join">
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={weapon.health.current}
							min={0}
							onchange={toggleDirty}
						/>
						<div class="input join-item input-bordered flex items-center justify-center p-4">
							<span>/</span>
						</div>
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={weapon.health.max}
							min={0}
							onchange={toggleDirty}
						/>
					</div>
					<button class="btn" onclick={resetHp}>Reset HP</button>
				</div>
			</label>
			<label class="form-control">
				<span class="inline">{weapon.resourceType}</span>
				<div class="flex gap-2">
					<div class="join">
						<select
							class="join-item select select-bordered"
							bind:value={weapon.resourceType}
							onchange={toggleDirty}
						>
							{#each resourceTypes as type}
								<option value={type}>{type}</option>
							{/each}
						</select>
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={weapon.resource.current}
							min={0}
							onchange={toggleDirty}
						/>
						<div class="input join-item input-bordered flex items-center justify-center p-4">
							<span>/</span>
						</div>
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={weapon.resource.max}
							min={0}
							onchange={toggleDirty}
						/>
					</div>
					<button class="variant-outline btn" onclick={resetResource}
						>Reset {weapon.resourceType}</button
					>
				</div>
			</label>
		</div>
		<div class="flex flex-1 flex-wrap gap-2">
			<label class="form-control w-full">
				<span>Passive</span>
				<div class="flex gap-2">
					<input
						type="text"
						class="input input-bordered"
						placeholder="Passive Effect"
						bind:value={weapon.passive.name}
						onchange={toggleDirty}
					/>
					<input
						type="text"
						class="input input-bordered flex-1"
						placeholder="Effect Description"
						bind:value={weapon.passive.description}
						onchange={toggleDirty}
					/>
				</div>
			</label>
		</div>
	</div>
	<div class="flex flex-wrap gap-2">
		<div class="flex-1">
			<label class="form-control">
				<span>Crush</span>
				<input
					type="number"
					class="input input-bordered"
					bind:value={weapon.crush}
					min={0}
					onchange={toggleDirty}
				/>
			</label>
		</div>
		<div class="flex-1">
			<label class="form-control">
				<span>Slice</span>
				<input
					type="number"
					class="input input-bordered"
					bind:value={weapon.slice}
					min={0}
					onchange={toggleDirty}
				/>
			</label>
		</div>
		<div class="flex-1">
			<label class="form-control">
				<span>Pierce</span>
				<input
					type="number"
					class="input input-bordered"
					bind:value={weapon.pierce}
					min={0}
					onchange={toggleDirty}
				/>
			</label>
		</div>
	</div>
	<div class="form-control w-full gap-4">
		<div class="flex items-center gap-4">
			<h3>Weapon Tags</h3>
			<button class="btn" onclick={addTag}>Add Tag</button>
		</div>
		<div class="flex flex-col flex-wrap gap-2">
			{#each weapon.weaponTags as tag, i}
				<WeaponTag
					bind:tag={weapon.weaponTags[i]}
					onChange={(e) => updateTag(e, i)}
					onRemove={() => deleteTag(i)}
				/>
			{/each}
		</div>
	</div>
</div>
