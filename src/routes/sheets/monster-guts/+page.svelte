<script lang="ts">
	import type { PageData } from './$types';
	import type {ICharacter} from 'libTypes/MonsterGutsTypes';


	export let data: PageData;

	let characterList: ICharacter[] = data.characterList

	$: {
		if(dirty){
			if(selectedCharacter){
				characterList = characterList.map(character => {
					return character.id === selectedCharacter.id ? selectedCharacter : character;
				})
			}
			localStorage.setItem('monster-guts', JSON.stringify(characterList));
			dirty = false
		}
	}


	let dirty = false;
	let selectedCharacter: ICharacter;


	function createNewCharacter(){
		const newCharacter: ICharacter = {
			id: Date.now(),
			name: 'New Character',
			img: '',
			weapons: [],
			activeWeapon: '',
			equipment: {
				tags: []
			},
		}
		characterList = [...characterList, newCharacter];
		selectedCharacter = newCharacter;
		dirty = true
	}



</script>

<section class="mb-5">
	<section class="flex flex-row w-full gap-4">
		<div class="flex-1">
			<select class="select" name="character-select" bind:value={selectedCharacter}>
				{#each characterList as character}
					<option value={character}>{character.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex-2">
			<button class="btn variant-filled" on:click={createNewCharacter}>Create new character</button>
		</div>
	</section>
</section>

{#if selectedCharacter}
	<section class="card container p-4">
		<div class="card-body gap-4">
			<div class="grid grid-cols-4">
				<div class="col-span-2">
					<label class="label">
						<span>Name</span>
						<input type="text" class="input" bind:value={selectedCharacter.name} on:change={()=>dirty=true}>
					</label>
				</div>
			</div>
			<div class="mt-4 grid grid-cols-4">
				<div class="col-auto">
					<p>test</p>
				</div>
				<div class="col-auto">
					<p>test2</p>
				</div>
				<div class="col-auto">
					<p>test3</p>
				</div>
				<div class="col-auto">
					<p>test4</p>
				</div>
			</div>
		</div>
	</section>
{/if}