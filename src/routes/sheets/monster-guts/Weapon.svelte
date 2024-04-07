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

	function resetHp() {
		weapon.health.current = weapon.health.max;
		dirty = true;
	}

	function resetResource() {
		weapon.resource.current = weapon.resource.max;
		dirty = true;
	}
</script>

<div class="card col-auto grid grid-cols-1 gap-2 p-4">
	<div class="flex flex-row gap-2">
		<div class="flex w-full items-center gap-4">
			<input
				type="text"
				class="input flex-1"
				bind:value={weapon.weaponName}
				on:change={() => (dirty = true)}
			/>
			<button class="variant-soft-error btn" on:click={removeWeapon}>Delete</button>
		</div>
	</div>
	<label class="label">
		<span class="inline">Health</span>
		<div class="flex flex-row items-center gap-4">
			<input
				type="number"
				class="input"
				bind:value={weapon.health.current}
				min={0}
				on:change={() => (dirty = true)}
			/>
			<p>/</p>
			<input
				type="number"
				class="input"
				bind:value={weapon.health.max}
				min={0}
				on:change={() => (dirty = true)}
			/>
			<button class="variant-outline btn" on:click={resetHp}>Reset HP</button>
		</div>
	</label>
	<label class="label">
		<span class="inline">{weapon.resourceType}</span>
		<div class="flex flex-row items-center gap-4">
			<input
				type="number"
				class="input"
				bind:value={weapon.resource.current}
				min={0}
				on:change={() => (dirty = true)}
			/>
			<p>/</p>
			<input
				type="number"
				class="input"
				bind:value={weapon.resource.max}
				min={0}
				on:change={() => (dirty = true)}
			/>
			<button class="variant-outline btn" on:click={resetResource}
				>Reset {weapon.resourceType}</button
			>
		</div>
	</label>
	<div class="grid grid-cols-3 gap-2">
		<div class="col-auto">
			<label class="label">
				<span class="inline">Crush</span>
				<input
					type="number"
					class="input"
					bind:value={weapon.crush}
					min={0}
					on:change={() => (dirty = true)}
				/>
			</label>
		</div>
		<div class="col-auto">
			<label class="label">
				<span class="inline">Slice</span>
				<input
					type="number"
					class="input"
					bind:value={weapon.slice}
					min={0}
					on:change={() => (dirty = true)}
				/>
			</label>
		</div>
		<div class="col-auto">
			<label class="label">
				<span class="inline">Pierce</span>
				<input
					type="number"
					class="input"
					bind:value={weapon.pierce}
					min={0}
					on:change={() => (dirty = true)}
				/>
			</label>
		</div>
	</div>
</div>
