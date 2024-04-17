import type { IEquipmentTag } from "$lib/types/MonsterGutsTypes";

export const WeaponTags: IEquipmentTag[] = [
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
        name: 'Harm',
        description: 'Deals 1 Harm when attacking',
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