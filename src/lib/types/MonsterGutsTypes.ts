import { Resource } from 'libEnums/MonsterGutsEnums'


export interface Tag {
    name: string,
    type: string,
    effect: string
}

export interface Equipment {
    tags: string[]
}

export interface Weapon {
    weapon: string,
    crush: number,
    slice: number,
    pierce: number,
    resource: number,
    health: number,
    resourceType: Resource,
    tags: string[]
}



export interface Character {
    id: number,
    name: string,
    weapons: Weapon[]
}

