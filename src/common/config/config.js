export const {
  API_ROOT_URL,
  AUTH_API_ROOT_URL,
  DISABLE_ACCESS_TOKEN_REFRESH,
  DISABLE_DEBUG_TOKEN,
  LOCAL_DEBUG_JWT,
} = (window.__ENV__ || import.meta.env)
