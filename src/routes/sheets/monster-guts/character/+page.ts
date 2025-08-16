import type { PageLoad } from '../$types';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	let characterList: MonsterGuts.ICharacter[] = [];
	const list = localStorage.getItem('monster-guts');
	if (list) {
		const parsed = JSON.parse(list) as unknown as MonsterGuts.ICharacter[];
		// TODO list cleanup to prevent errors when loading values

		characterList = parsed;
	}

	return {
		characterList
	};
};
