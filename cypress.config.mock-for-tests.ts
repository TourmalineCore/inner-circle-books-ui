import { defineConfig } from 'cypress'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3505`,
    env: {
      API_ROOT_URL: `http://localhost:3505/api/books`,
      AUTH_API_ROOT_URL: `http://localhost:8505/api/auth`,
      USER_LOGIN: `first-tenant-login-with-all-permissions`,
      USER_PASSWORD: `first-tenant-password-with-all-permissions`,
      // authorize via the local debug token instead of a real auth flow
      DISABLE_DEBUG_TOKEN: false,
      // the /b -> /books redirect is done by the ingress, not by this app,
      // so the tests that check it only make sense outside a local run
      DISABLE_REDIRECT: true,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
})
