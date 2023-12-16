import { redirect, type ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
	if (!locals.accessToken) {
		throw redirect(302, '/account/login');
	}
}
