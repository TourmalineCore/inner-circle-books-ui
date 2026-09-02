/* eslint-disable no-undef */
import fs from 'fs'

const filepath = `./public/env-config.js`
const filepathCypress = `./cypress/env-config.js`

// .env-vars lists the variables the app is allowed to see in the browser, and the values come
// from .env. This is what ci/env.sh does inside a built image, only for a local run
const variables = fs.readFileSync(`./.env-vars`, `utf-8`)
  .split(`\n`)
  .map((key) => key.trim())
  .filter(Boolean)
  .map((key) => `${key}: "${process.env[key] ?? ``}",`)
  .join(``)

fs.writeFileSync(filepath, `window.__ENV__ = { ${variables} }`)
fs.writeFileSync(filepathCypress, `window.__ENV__ = { ${variables} }`)
