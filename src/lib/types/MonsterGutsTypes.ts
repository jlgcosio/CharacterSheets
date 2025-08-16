import { Resource, CompanionBreed } from '$lib/enums/MonsterGutsEnums';

export interface IClock {
	current: number;
	max: number;
	immune: boolean;
}

export interface IEquipmentTag {
	name: string;
	description: string;
	type: 'Ephemera' | 'Elemental' | 'Effect' | 'Equipment';
	equipped?: boolean;
}

export interface IEquipment {
	tags: IEquipmentTag[];
}

export interface IWeaponMove {
	name: string;
	cost: number;
	description: string;
}

export interface IWeaponPassive {
	name: string;
	description: string;
}

export interface IWeapon {
	weaponName: string;
	blisters: number;
	crush: number;
	slice: number;
	pierce: number;
	resource: {
		current: number;
		max: number;
	};
	health: {
		current: number;
		max: number;
	};
	resourceType: Resource;
	weaponTags: IEquipmentTag[];
	passive: IWeaponPassive;
	moves: IWeaponMove[];
}

export interface ICompanionTool {
	name: string;
	description: string;
	used: boolean;
}

export interface IMonsterPart {
	name: string;
	type: 'Hard' | 'Soft';
	values: {
		current: number;
		max: number;
	};
	broken: boolean;
}

export interface IMonsterMove {
	name: string;
	description: string;
	harm: number;
}

export interface IMonsterTag {
	name: string;
	desciption: string;
}

// High level types

/**
 * Search currently used weapon by activeWeapon
 */
export interface ICharacter {
	id: number;
	name: string;
	weapons: IWeapon[];
	activeWeapon: number; // search by weapon name
	img: string;
	equipment: IEquipment;
	notes: string;
}

export interface ICompanion {
	name: string;
	type: CompanionBreed;
	tool: ICompanionTool;
}

export interface IMonster {
	id: string;
	name: string;
	description: string;
	rage: string;
	tags: IMonsterTag[];
	moves: IMonsterMove[];
	body: {
		current: number;
		max: number;
	};
	parts: IMonsterPart[];
	clocks: {
		bleed: IClock;
		fire: IClock;
		ice: IClock;
		metal: IClock;
		shock: IClock;
		slime: IClock;
		snooze: IClock;
		stagger: IClock;
		stun: IClock;
		venom: IClock;
		dragon: IClock;
		water: IClock;
		defensedown: IClock;
		soiled: IClock;
		webbed: IClock;
	};
}
