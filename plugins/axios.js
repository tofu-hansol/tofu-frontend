export default function ({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
      // check if the user is authenticated
      if (store.state.accessToken) {
        // set the Authorization header using the access token
        config.headers.Authorization = 'Bearer ' + store.state.accessToken
      }
  
      return config
    })
  }

// export default function ({ store, app: { $axios }, redirect }) {
//     const IGNORED_PATHS = ['/api/auth/**']

//     $axios.onRequest((config) => {
//       // check if the user is authenticated
//       if (store.state.auth.accessToken) {
//         // set the Authorization header using the access token
//         config.headers.Authorization = 'Bearer ' + store.state.auth.accessToken
//       }

//       return config
//     })

//     $axios.onError((error) => {
//       return new Promise(async (resolve, reject) => {
//         // ignore certain paths (i.e. paths relating to authentication)
//         const isIgnored = IGNORED_PATHS.some(path => error.config.url.includes(path))

//         // get the status code from the response
//         const statusCode = error.response ? error.response.status : -1

//         // only handle authentication errors or errors involving the validity of the token
//         if ((statusCode === 401 || statusCode === 422) && !isIgnored) {
//           // API should return a reason for the error, represented here by the textCode property

//           // Example API response:
//           // {
//           //   status: 'failed',
//           //   textCode: 'TOKEN_EXPIRED',
//           //   message: 'The JWT token is expired',
//           //   status_code: 401
//           // }

//           // retrieve the textCode property from the response, or default to null
//           const { data: { textCode } = { textCode: null } } = error.response || {}

//           // get the refresh token from the state if it exists
//           const refreshToken = store.state.auth.refresh_token

//           // determine if the error is a result of an expired access token
//           // also ensure that the refresh token is present
//           if (textCode === 'TOKEN_EXPIRED' && refreshToken) {
//             console.log('error -> ', error);
//             // see below - consider the refresh process failed if this is a 2nd attempt at the request
//             // if (error.config.('retryAttempts')) {
//               // immediately logout if already attempted refresh
//             //   await store.dispatch('logout')

//               // redirect the user home
//             //   return redirect('/')
//             // } else {
//               // merge a new retryAttempts property into the original request config to prevent infinite-loop if refresh fails
//               const config = { retryAttempts: 1, ...error.config }

//               try {
//                 // attempt to refresh access token using refresh token
//                 await store.dispatch('refresh')

//                 // re-run the initial request using the new request config after a successful refresh
//                 // this response will be returned to the initial calling method
//                 return resolve($axios(config))
//               } catch (e) {
//                 // catch any error while refreshing the token
//                 await store.dispatch('logout')

//                 // redirect the user home
//                 return redirect('/')
//             //   }
//             }
//           } else if (textCode === 'TOKEN_INVALID') {
//             // catch any other JWT-related error (i.e. malformed token) and logout the user
//             await store.dispatch('logout')

//             // redirect the user home
//             return redirect('/')
//           }
//         }

//         // ignore all other errors, let component or other error handlers handle them
//         return reject(error)
//       })
//     })
//   }
