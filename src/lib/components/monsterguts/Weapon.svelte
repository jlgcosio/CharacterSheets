<script lang="ts">
	import type { IWeapon } from 'libTypes/MonsterGutsTypes';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let weapon: IWeapon;
	let dirty = false;

	function removeWeapon() {
		dispatch('delete');
	}

	$: if (dirty) {
		dispatch('change');
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
		<div class="flex flex-1 flex-wrap">
			<label class="form-control w-full">
				<span>Passive</span>
				<div class="grid grid-cols-3 gap-2">
					<input
						type="text"
						class="input input-bordered col-span-1"
						placeholder="Passive Effect"
						bind:value={weapon.passive.name}
						on:change={toggleDirty}
					/>
					<input
						type="text"
						class="input input-bordered col-span-2"
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
</div>
