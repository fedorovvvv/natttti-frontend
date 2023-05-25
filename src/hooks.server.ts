import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '') as App.Locals;

    event.locals.accessToken = cookies.accessToken
    
    const response = await resolve(event);

    response.headers.set('Referrer-Policy', 'no-referrer');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    return response;
};

// export const handleError:HandleError = ({ error, event }) => {
//     sentry.init()
//     const errorId = crypto.randomUUID()
//     if (!dev) {
//       //@ts-ignore
//       captureException(error, { event, errorId })
//     }
   
//     return {
//       message: 'Whoops!',
//       errorId
//     };
// }

// export const getSession = (event:{locals: App.Locals})=> {
//     console.log(new Date(), 'getSession')
//     // console.log('getSession', {event})
//     const cookies = cookie.parse(event.request.headers.get('cookie') || '');
//     // console.log('getSession cookies', {cookies})
//     return {
//         accessToken: event.locals.accessToken,
//         expireDateAccessToken: event.locals.expireDateAccessToken,
//         refreshToken: event.locals.refreshToken,
//         expireDateRefreshToken: event.locals.expireDateRefreshToken,
//         isClear: event.locals.isClear,
//     }
// }