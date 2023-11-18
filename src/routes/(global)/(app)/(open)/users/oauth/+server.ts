import { redirect } from '@sveltejs/kit';
import { getUsersCollection } from '$entities/users/api/collection.js';


export const GET = async ({locals,  url, cookies, request  }) => {
    console.log(url.searchParams);
    console.log(cookies.getAll())
    const redirectURL = `${url.origin}/users/oauth`;
    const expectedState = cookies.get('state');
    const expectedVerifier = cookies.get('verifier');

    console.log({
        expectedState,
        expectedVerifier
    })

    const state = url.searchParams.get('state');
    const code = url.searchParams.get('code');

    const usersCollection = getUsersCollection(locals.pb)

    console.log('returned state',state)
    console.log('returned code',code)

    //as a side effect this will generate a new code verifier, hence why we need to pass the verifier back in through the cookie
    const authMethods = await usersCollection.listAuthMethods();
    
    if (!code) {
        console.log('No Auth Data');
        throw redirect(303, '/users/reg');
    }
    const provider = authMethods.authProviders.find(({name}) => name === 'github');
    if (!provider) {
        console.log('Provider Not Found');
        throw redirect(303, '/users/reg');
    }

    if (expectedState !== state) {
        console.log('Returned State Does not Match Expected', expectedState, state);
        throw redirect(303, '/users/reg');
    }

    try {
        console.log(provider)
        await usersCollection
            .authWithOAuth2Code(provider.name, code, expectedVerifier, redirectURL,{username:'',name:'My Awesome User'});
    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }

    throw redirect(303, '/');
};