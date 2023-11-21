import type { Handle } from '@sveltejs/kit';
import { getUsersCollection } from '$entities/users';
import { createPocketBaseInstance, type UsersResponse } from '$shared/api/pocketbase';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
    const pb = createPocketBaseInstance()

    event.locals.pb = pb
  
    // load the store data from the request cookie string
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
    try {
      // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
      if (pb.authStore.isValid) {
        await getUsersCollection(pb).authRefresh()
      }
    } catch (_) {
      // clear the auth store on failed refresh
      pb.authStore.clear()
    }
    
  
    event.locals.user = pb.authStore?.model as UsersResponse
  
    const response = await resolve(event)
  
    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append(
      'set-cookie',
      pb.authStore.exportToCookie(dev ? {httpOnly: false} : { httpOnly: true, secure: true, sameSite: 'lax' })
    )
  
    return response
  }

// export const handle: Handle = async ({ event, resolve }) => {
// 	const cookies = cookie.parse(event.request.headers.get('cookie') || '') as App.Locals;

//     event.locals.accessToken = cookies.accessToken
    
//     const response = await resolve(event);

//     response.headers.set('Referrer-Policy', 'no-referrer');
//     response.headers.set('Access-Control-Allow-Origin', '*');
//     response.headers.set('X-Content-Type-Options', 'nosniff');
//     response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
//     return response;
// };

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