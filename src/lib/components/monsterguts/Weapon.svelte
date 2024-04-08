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

<div class="col-auto grid grid-cols-1 gap-2 p-4">
	<div class="flex flex-row gap-2">
		<div class="flex w-full items-center gap-4">
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
	<div class="flex w-full gap-4">
		<div class="flex flex-1 flex-col gap-2">
			<label class="form-control">
				<span class="inline">Health</span>
				<div class="flex flex-row items-center gap-4">
					<input
						type="number"
						class="input input-bordered"
						bind:value={weapon.health.current}
						min={0}
						on:change={toggleDirty}
					/>
					<span>/</span>
					<input
						type="number"
						class="input input-bordered"
						bind:value={weapon.health.max}
						min={0}
						on:change={toggleDirty}
					/>
					<button class="btn" on:click={resetHp}>Reset HP</button>
				</div>
			</label>
			<label class="form-control">
				<span class="inline">{weapon.resourceType}</span>
				<div class="flex flex-row items-center gap-4">
					<input
						type="number"
						class="input input-bordered"
						bind:value={weapon.resource.current}
						min={0}
						on:change={toggleDirty}
					/>
					<span>/</span>
					<input
						type="number"
						class="input input-bordered"
						bind:value={weapon.resource.max}
						min={0}
						on:change={toggleDirty}
					/>
					<button class="variant-outline btn" on:click={resetResource}
						>Reset {weapon.resourceType}</button
					>
				</div>
			</label>
		</div>
		<div class="flex-1">
			<label class="form-control">
				<p>Passive</p>
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
	<div class="grid grid-cols-3 gap-2">
		<div class="col-auto">
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
		<div class="col-auto">
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
		<div class="col-auto">
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
