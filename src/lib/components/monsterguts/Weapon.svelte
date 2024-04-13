<script lang="ts">
	import type { ITag, IWeapon } from 'libTypes/MonsterGutsTypes';
	import { createEventDispatcher } from 'svelte';
	import WeaponTag from './WeaponTag.svelte';

	const dispatch = createEventDispatcher<{ change: IWeapon; delete: any }>();

	export let weapon: IWeapon;
	let dirty = false;

	// Update this list when expanding IWeapon:resourceTypes property
	const resourceTypes = ['Edge', 'Ammo', 'Melody'];

	function removeWeapon() {
		dispatch('delete');
	}

	$: if (dirty) {
		dispatch('change', weapon);
		dirty = false;
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
		const newTag: ITag = {
			name: '',
			description: '',
			type: 'Equipment'
		};
		weapon.weaponTags = [...weapon.weaponTags, newTag];
	}

	function deleteTag(index: number) {
		weapon.weaponTags = weapon.weaponTags.filter((t, i) => i !== index);
		dirty = true;
	}

	function updateTag(tag: ITag, index: number) {
		weapon = {
			...weapon,
			weaponTags: weapon.weaponTags.map((t, i) => {
				console.log(t, i === index);
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
				on:change={toggleDirty}
			/>
			<button class="btn btn-warning" on:click={removeWeapon}>Delete</button>
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
							on:change={toggleDirty}
						/>
						<div class="input join-item input-bordered flex items-center justify-center p-4">
							<span>/</span>
						</div>
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={weapon.health.max}
							min={0}
							on:change={toggleDirty}
						/>
					</div>
					<button class="btn" on:click={resetHp}>Reset HP</button>
				</div>
			</label>
			<label class="form-control">
				<span class="inline">{weapon.resourceType}</span>
				<div class="flex gap-2">
					<div class="join">
						<select
							class="join-item select select-bordered"
							bind:value={weapon.resourceType}
							on:change={toggleDirty}
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
							on:change={toggleDirty}
						/>
						<div class="input join-item input-bordered flex items-center justify-center p-4">
							<span>/</span>
						</div>
						<input
							type="number"
							class="input join-item input-bordered"
							bind:value={weapon.resource.max}
							min={0}
							on:change={toggleDirty}
						/>
					</div>
					<button class="variant-outline btn" on:click={resetResource}
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
						on:change={toggleDirty}
					/>
					<input
						type="text"
						class="input input-bordered flex-1"
						placeholder="Effect Description"
						bind:value={weapon.passive.description}
						on:change={toggleDirty}
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
					on:change={toggleDirty}
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
					on:change={toggleDirty}
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
					on:change={toggleDirty}
				/>
			</label>
		</div>
	</div>
	<div class="form-control w-full gap-4">
		<div class="flex items-center gap-4">
			<h3>Weapon Tags</h3>
			<button class="btn" on:click={addTag}>Add Tag</button>
		</div>
		<div class="flex flex-col flex-wrap gap-2">
			{#each weapon.weaponTags as tag, i}
				<WeaponTag {tag} on:change={(e) => updateTag(e.detail, i)} on:remove={() => deleteTag(i)} />
			{/each}
		</div>
	</div>
</div>
