import type { PageServerLoad } from './$types';

export const load = (async () => {

    let test = {
        a: "A thing",
        b: "B thing"
    }

    return {
        test
    };
}) satisfies PageServerLoad;