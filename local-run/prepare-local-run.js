/* eslint-disable no-undef */
import fs from 'fs'
import { wrapAsJwt } from '../src/common/wrapAsJwt.js'

// branch/commit other than master, e.g. to test against a feature branch's
const API_REPO_REF = process.env.BOOKS_API_REF || `master`

const API_REPO_URL = `https://raw.githubusercontent.com/TourmalineCore/inner-circle-books-api/${API_REPO_REF}`

const MOCK_SERVER_CONFIG_URL = `${API_REPO_URL}/e2e/mock-server-initialization.json`
const MOCK_SERVER_CONFIG_PATH = `./local-run/mock-server-initialization.json`

const API_COMPOSE_URL = `${API_REPO_URL}/docker-compose.yml`
const API_COMPOSE_PATH = `./local-run/api-docker-compose.yml`

const LAYOUT_UI_COMPOSE_URL = `https://raw.githubusercontent.com/TourmalineCore/inner-circle-layout-ui/master/docker-compose.yml`
const LAYOUT_UI_COMPOSE_PATH = `./local-run/layout-ui-docker-compose.yml`

const ENV_CONFIG_PATH = `./public/env-config.js`

// find  "...all-permissions" or  "...ALL_PERMISSIONS"
const ALL_PERMISSIONS_LOGIN_PATTERN = /all[-_]permissions/i

async function prepareLocalRunAsync() {
  await fetchRemoteFileAsync({
    url: API_COMPOSE_URL,
    path: API_COMPOSE_PATH,
  })

  await fetchRemoteFileAsync({
    url: LAYOUT_UI_COMPOSE_URL,
    path: LAYOUT_UI_COMPOSE_PATH,
  })

  // also written to disk: api-docker-compose.override.yml mounts this file into api-mock-server
  const mockServerConfigBody = await fetchRemoteFileAsync({
    url: MOCK_SERVER_CONFIG_URL,
    path: MOCK_SERVER_CONFIG_PATH,
  })
  const mockServerConfig = JSON.parse(mockServerConfigBody)

  const localDebugToken = readLocalDebugToken({
    mockServerConfig,
  })
  
  const localDebugJwt = wrapAsJwt(localDebugToken)

  const envEntries = `LOCAL_DEBUG_TOKEN: "${localDebugToken}",LOCAL_DEBUG_JWT: "${localDebugJwt}",`

  // writes the mock server's debug token into env-config.js so the local app can use it
  injectIntoEnvConfig({
    path: ENV_CONFIG_PATH,
    envEntries,
  })
}

// fetches a file from `url` and saves a copy of it to disk at `path`
async function fetchRemoteFileAsync({
  url,
  path,
}) {
  const response = await fetch(url)
  const body = await response.text()

  fs.writeFileSync(path, body)

  return body
}

// mock-server-initialization.json can have several /api/auth/login mocks
// we need the all-permissions one, so match on the login value, not just the path
function readLocalDebugToken({
  mockServerConfig,
}) {
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
function injectIntoEnvConfig({
  path,
  envEntries,
}) {
  if (!fs.existsSync(path)) {
    return
  }

  const fileBuffer = fs.readFileSync(path)
  const content = fileBuffer.toString()
  const contentWithoutOldEntries = content.replace(/LOCAL_DEBUG_TOKEN: "[^"]*",LOCAL_DEBUG_JWT: "[^"]*",/, ``)

  fs.writeFileSync(path, contentWithoutOldEntries.replace(`window.__ENV__ = { `, `window.__ENV__ = { ${envEntries}`))
}

prepareLocalRunAsync()
