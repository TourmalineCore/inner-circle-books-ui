/* eslint-disable no-undef */
import fs from 'fs'
import { wrapAsJwt } from './src/common/wrapAsJwt.js'

const MOCK_SERVER_CONFIG_URL = `https://raw.githubusercontent.com/TourmalineCore/inner-circle-books-api/master/e2e/mock-server-initialization.json`
const MOCK_SERVER_CONFIG_PATH = `./mock-server-initialization.json`

const BOOKS_API_COMPOSE_URL = `https://raw.githubusercontent.com/TourmalineCore/inner-circle-books-api/master/docker-compose.yml`
const API_COMPOSE_PATH = `./books-api-docker-compose.yml`

const ENV_CONFIG_PATH = `./public/env-config.js`

// also written to disk: docker-compose.yml mounts this file into books-api-mock-server
async function fetchMockServerConfig() {
  const response = await fetch(MOCK_SERVER_CONFIG_URL)
  const body = await response.text()

  fs.writeFileSync(MOCK_SERVER_CONFIG_PATH, body)

  return JSON.parse(body)
}

async function fetchBooksApiCompose() {
  const response = await fetch(BOOKS_API_COMPOSE_URL)
  const body = await response.text()

  fs.writeFileSync(API_COMPOSE_PATH, body)
}

// find  "...all-permissions" or  "...ALL_PERMISSIONS"
const ALL_PERMISSIONS_LOGIN_PATTERN = /all[-_]permissions/i

// mock-server-initialization.json can have several /api/auth/login mocks
// we need the all-permissions one, so match on the login value, not just the path
function readLocalDebugToken(mockServerConfig) {
  const loginMock = mockServerConfig.find((mock) => (
    mock.httpRequest.path === `/api/auth/login`
    && ALL_PERMISSIONS_LOGIN_PATTERN.test(mock.httpRequest.body.login)
  ))

  return JSON.parse(loginMock.httpResponse.body).accessToken.value
}

// if this script already ran before, env-config.js has an old LOCAL_DEBUG_TOKEN/LOCAL_DEBUG_JWT
// entry in it we need to remove that first so re-running doesn't just append a duplicate
// if env-config.js doesn't exist at all yet (e.g. `local-services:up` was run on its own,
// without `create-config:local` first), there's nothing to inject into, so just skip
function injectIntoEnvConfig(path, envEntries) {
  if (!fs.existsSync(path)) {
    return
  }

  const fileBuffer = fs.readFileSync(path)
  const content = fileBuffer.toString()
  const contentWithoutOldEntries = content.replace(/LOCAL_DEBUG_TOKEN: "[^"]*",LOCAL_DEBUG_JWT: "[^"]*",/, ``)

  fs.writeFileSync(path, contentWithoutOldEntries.replace(`window.__ENV__ = { `, `window.__ENV__ = { ${envEntries}`))
}

async function run() {
  await fetchBooksApiCompose()

  const mockServerConfig = await fetchMockServerConfig()
  const localDebugToken = readLocalDebugToken(mockServerConfig)
  const localDebugJwt = wrapAsJwt(localDebugToken)

  const envEntries = `LOCAL_DEBUG_TOKEN: "${localDebugToken}",LOCAL_DEBUG_JWT: "${localDebugJwt}",`

  injectIntoEnvConfig(ENV_CONFIG_PATH, envEntries)
}

run()
