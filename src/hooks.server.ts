import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token as App.Locals['token']

    event.locals.token = token
    
    const response = await resolve(event);
    
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