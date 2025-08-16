import type { ICharacter } from '$lib/types/MonsterGutsTypes';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ params }) => {
	let characterList: ICharacter[] = [];
	const list = localStorage.getItem('monster-guts');
	if (list) {
		const parsed = JSON.parse(list) as unknown as ICharacter[];
		// TODO list cleanup to prevent errors when loading values

		characterList = parsed;
	}

	return {
		characterList
	};
};
