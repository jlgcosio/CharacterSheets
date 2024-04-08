import type { ITag, IWeapon } from "libTypes/MonsterGutsTypes";


export const WeaponsList: IWeapon[] = [
    {
        weaponName: 'Bow',
        blisters: 0,
        crush: 0,
        slice: 2,
        pierce: 2,
        health: {
            current: 6,
            max: 6,
        },
        resource: {
            current: 5,
            max: 5
        },
        resourceType: 'Ammo',
        passive: {
            name: 'Accurate',
            description: 'Always hit the targeted monster part on a mixed success'
        },
        weaponTags: [
            {
                name: 'Aimed',
                description: "+1 Harm when using Pierce",
                type: 'Equipment'
            },
            {
                name: 'Near',
                description: "Useful nearby",
                type: 'Equipment'
            },
            {
                name: 'Far',
                description: "Useful at a distance",
                type: 'Equipment'
            },
            {
                name: 'Reload',
                description: "Weapon must be reloaded",
                type: 'Equipment'
            },
        ],
        moves: [
            {
                name: 'Sidestep',
                cost: 1,
                description: 'Close; Evade incoming attacks and deal 4 Harm at the start of your next turn.'
            },
            {
                name: 'Quick Shot',
                cost: 1,
                description: 'Near; Fire a rapid volley, dealing 2 Harm to all parts and targets in range.'
            },
            {
                name: 'Skullpiercer',
                cost: 2,
                description: 'Near; Spend the round drawing a deadly shot, dealing 10 Harm at the start of your next turn unless the attack is interrupted.'
            },
        ]
    }
]