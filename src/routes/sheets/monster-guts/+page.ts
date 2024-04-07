import type { ICharacter } from 'libTypes/MonsterGutsTypes';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async () => {
	let characterList: ICharacter[] = [];
	const list = localStorage.getItem('monster-guts');
	if (list) {
		const parsed = JSON.parse(list) as unknown as ICharacter[];
		characterList = parsed;
	}

	return {
		characterList
	};
}) satisfies PageLoad;
