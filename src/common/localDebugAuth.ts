import { authService } from './authService'
import { DISABLE_DEBUG_TOKEN, LOCAL_DEBUG_JWT } from './config/config'

export function logInAsLocalDebugUserIfDebugTokenEnabled() {
  if (DISABLE_DEBUG_TOKEN !== `false` || authService.getAuthToken()) {
    return
  }

  authService.setLoggedIn({
    accessToken: {
      value: LOCAL_DEBUG_JWT,
    },
  })
}
