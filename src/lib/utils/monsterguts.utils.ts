import type { ICharacter, IEquipmentTag, IMonster, IMonsterMove, IMonsterPart, IWeapon } from '$lib/types/MonsterGutsTypes';


export function createBlankEquipmentTag(): IEquipmentTag {
    return {
        name: '',
        description: '',
        type: 'Elemental',
        equipped: false
    }
}

export function createBlankWeapon(): IWeapon {
    return {
        blisters: 0,
        health: {
            current: 0,
            max: 0
        },
        crush: 0,
        slice: 0,
        pierce: 0,
        weaponName: 'New Weapon',
        weaponTags: [],
        passive: {
            name: 'Passive',
            description: 'Passive effect description'
        },
        resource: {
            current: 0,
            max: 0
        },
        resourceType: 'Edge',
        moves: []
    }
}

export function createBlankCharacter(): ICharacter {
    return {
        name: 'New Character',
        img: '',
        weapons: [createBlankWeapon()],
        activeWeapon: 0,
        equipment: {
            tags: []
        },
        notes: '',
        id: Date.now()
    };
}

export function createBlankMonsterPart(): IMonsterPart {
    return {
        name: '',
        broken: false,
        type: 'Hard',
        values: {
            current: 0,
            max: 0
        }
    }
}

export function createBlankMonsterMove(): IMonsterMove {
    return {
        name: '',
        description: '',
        harm: 0
    }
}

export function createBlankMonster(invalid?: boolean): IMonster {
    return {
        id: `monster-${Date.now()}`,
        name: invalid ? "Invalid import" : 'New Monster',
        description: '',
        rage: '',
        tags: [],
        moves: [],
        body: {
            current: 50,
            max: 50
        },
        parts: [],
        clocks: {
            bleed: {
                current: 0,
                max: 6,
                immune: false
            },
            fire: {
                current: 0,
                max: 6,
                immune: false
            },
            ice: {
                current: 0,
                max: 6,
                immune: false
            },
            metal: {
                current: 0,
                max: 6,
                immune: false
            },
            shock: {
                current: 0,
                max: 6,
                immune: false
            },
            slime: {
                current: 0,
                max: 6,
                immune: false
            },
            snooze: {
                current: 0,
                max: 6,
                immune: false
            },
            stagger: {
                current: 0,
                max: 6,
                immune: false
            },
            stun: {
                current: 0,
                max: 6,
                immune: false
            },
            venom: {
                current: 0,
                max: 6,
                immune: false
            },
            dragon: {
                current: 0,
                max: 6,
                immune: false
            },
            defensedown: {
                current: 0,
                max: 6,
                immune: false
            },
            water: {
                current: 0,
                max: 6,
                immune: false
            },
            webbed: {
                current: 0,
                max: 6,
                immune: false
            },
            soiled: {
                current: 0,
                max: 6,
                immune: false
            }
        }
    }
}

export function shapeAsValidMonster(item: any): IMonster {
    if (typeof item === 'object') {
        console.log('shapeAsValidMonster', item);
        const newThing = createBlankMonster(true)
        return {
            ...newThing,
            ...item,
            clocks: {
                ...newThing.clocks,
                ...item.clocks
            }
        }
    }
    else {
        return createBlankMonster(true)
    }

}