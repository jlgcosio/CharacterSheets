import type { ICharacter, ITag, IWeapon } from "libTypes/MonsterGutsTypes";

export const NewCharacter: ICharacter = {
    id: Date.now(),
    name: 'New Character',
    img: '',
    weapons: [],
    activeWeapon: 0,
    equipment: {
        tags: []
    },
    notes: ''
};

export const NewWeapon: IWeapon = {
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
};

export const WeaponTags: ITag[] = [
    {
        name: 'Aimed',
        description: "+1 Harm when using Pierce",
        type: 'Equipment'
    },
    {
        name: 'Aerial',
        description: "While airborne, attacks deal +2 Harm",
        type: 'Equipment'
    },
    {
        name: 'Brutal',
        description: "+1 Harm when using Crush",
        type: 'Equipment'
    },
    {
        name: 'Cleaving',
        description: "Affects multiple targets with each swing",
        type: 'Equipment'
    },
    {
        name: 'Close',
        description: "Useful at-hand",
        type: 'Equipment'
    },
    {
        name: 'Explosive',
        description: "On a 6, deal +1 Harm",
        type: 'Equipment'
    },
    {
        name: 'Far',
        description: "Useful at a distance",
        type: 'Equipment'
    },
    {
        name: 'Glancing',
        description: "Failures deal half Harm to a Close target",
        type: 'Equipment'
    },
    {
        name: 'Keen',
        description: "+1 Harm when using Slice",
        type: 'Equipment'
    },
    {
        name: 'Near',
        description: "Useful nearby",
        type: 'Equipment'
    },
    {
        name: 'Musical',
        description: "Each swing adds +1 Melody",
        type: 'Equipment'
    },
    {
        name: 'Reload',
        description: "Weapon must be reloaded",
        type: 'Equipment'
    },
    {
        name: 'Stationary',
        description: "Must be still to use",
        type: 'Equipment'
    },
    {
        name: 'Stunning',
        description: "On a 6, +1 Stun Clock",
        type: 'Equipment'
    },
]

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
                name: '1 Harm',
                description: "Deals 1 harm on basic attacks",
                type: 'Equipment'
            },
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
    },
    {
        weaponName: 'Bowgun',
        blisters: 0,
        crush: 0,
        slice: 1,
        pierce: 3,
        health: {
            current: 6,
            max: 6,
        },
        resource: {
            current: 4,
            max: 4
        },
        resourceType: 'Ammo',
        passive: {
            name: 'Accurate',
            description: 'Always hit the targeted monster part on a mixed success'
        },
        weaponTags: [
            {
                name: '1 Harm',
                description: "Deals 1 harm on basic attacks",
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
            {
                name: 'Explosive',
                description: "On a 6, deal +1 Harm",
                type: 'Equipment'
            },
        ],
        moves: [
            {
                name: 'Scattershot',
                cost: 1,
                description: 'Close; Pellets inflict 2 Harm on all targets.'
            },
            {
                name: 'Sticky Shot',
                cost: 1,
                description: 'Near; Sticky grenade deals 3 Harm to foe and adjacent targets at the start of the next round. Headshots inflict +1 Stun clock.'
            },
            {
                name: 'Skullpiercer',
                cost: 2,
                description: 'Close; Plant a mine on the ground or a monster part. Attacks to a mined part deal 3 extra Harm, and if a monster moves past a mine, they take 3 Harm and +1 Stun clock.'
            },
        ]
    }
]