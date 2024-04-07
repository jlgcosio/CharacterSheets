import { Resource, CompanionBreed } from 'libEnums/MonsterGutsEnums';

export interface ITag {
	name: string;
	description: string;
	type: 'Ephemera' | 'Elemental' | 'Effect' | 'Equipment';
}

export interface IEquipment {
	tags: ITag[];
}

export interface IWeaponMove {
	name: string;
	cost: number;
	description: number;
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
	resourceType: 'Edge' | 'Ammo' | 'Melody';
	weaponTags: ITag[];
	passive: IWeaponPassive;
}

export interface ICompanionTool {
	name: string;
	description: string;
	used: boolean;
}

// High level types

/**
 * Search currently used weapon by activeWeapon
 */
export interface ICharacter {
	id: number;
	name: string;
	weapons: IWeapon[];
	activeWeapon: string; // search by weapon name
	img: string;
	equipment: IEquipment;
}

export interface ICompanion {
	name: string;
	type: CompanionBreed;
	tool: ICompanionTool;
}
