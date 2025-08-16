import { Resource, CompanionBreed } from '$lib/enums/MonsterGutsEnums';

declare global {
	namespace MonsterGuts {
		interface IClock {
			current: number;
			max: number;
			immune: boolean;
		}

		interface IEquipmentTag {
			name: string;
			description: string;
			type: 'Ephemera' | 'Elemental' | 'Effect' | 'Equipment';
			equipped?: boolean;
		}

		interface IEquipment {
			tags: IEquipmentTag[];
		}

		interface IWeaponMove {
			name: string;
			cost: number;
			description: string;
		}

		interface IWeaponPassive {
			name: string;
			description: string;
		}

		interface IWeapon {
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

		interface ICompanionTool {
			name: string;
			description: string;
			used: boolean;
		}

		interface IMonsterPart {
			name: string;
			type: 'Hard' | 'Soft';
			values: {
				current: number;
				max: number;
			};
			broken: boolean;
		}

		interface IMonsterMove {
			name: string;
			description: string;
			harm: number;
		}

		interface IMonsterTag {
			name: string;
			desciption: string;
		}

		// High level types

		/**
		 * Search currently used weapon by activeWeapon
		 */
		interface ICharacter {
			id: number;
			name: string;
			weapons: IWeapon[];
			activeWeapon: number; // search by weapon name
			img: string;
			equipment: IEquipment;
			notes: string;
		}

		interface ICompanion {
			name: string;
			type: CompanionBreed;
			tool: ICompanionTool;
		}

		interface IMonster {
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
	}
}
