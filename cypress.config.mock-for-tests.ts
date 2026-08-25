import { defineConfig } from 'cypress'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3505`,
    env: {
      API_ROOT_URL: `http://localhost:6505/api/books`,
      AUTH_API_ROOT_URL: `http://localhost:8505/api/auth`,
      USER_LOGIN: `first-tenant-login-with-all-permissions`,
      USER_PASSWORD: `first-tenant-password-with-all-permissions`,
      DISABLE_DEBUG_TOKEN: false,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
})
