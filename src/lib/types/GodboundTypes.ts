import type { Attributes, GiftCategory } from "$lib/enums/GodboundEnums";

export interface IGift {
    category: GiftCategory,
    name: string,
    description: string,
    grantsArmor: boolean,
    grantsWeapon: boolean,
    grantedAc?: number,
    grantedWeapon?: string
    damageType?: string
}


export interface IWord {
    name: string,
    description: string,
    hasAttributeBoost: boolean,
    attributeBoosted?: Attributes,
    gifts: IGift[]
}

export interface ISavingThrow {
    base: number,
    hasPenalty: boolean,
    final: number,
    source: Attributes[]
}

export interface ICharacterAttribute {
    score: number,
    modifier: number,
    check: number
}

export interface IGodboundCharacter {
    level: number,
    name: string,
    facts: {
        origin: string,
        past_career: string,
        relationship: string,
        others: string
    }
    hp: {
        value: number,
        max: number
    },
    attributes: {
        str: ICharacterAttribute,
        dex: ICharacterAttribute,
        con: ICharacterAttribute,
        int: ICharacterAttribute,
        wis: ICharacterAttribute,
        cha: ICharacterAttribute,
    },
    savingThrows: {
        hardiness: ISavingThrow,
        evasion: ISavingThrow,
        spirit: ISavingThrow
    },
    fray: '1d4' | '1d6' | '1d8' | '1d10' | '1d12',
    effort: {
        value: number,
        max: number
    },
    resources: {
        influence: {
            value: number,
            max: number
        },
        dominion: number,
        wealth: number
    },
    words: IWord[]
}