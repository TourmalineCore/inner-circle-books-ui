/* eslint-disable @typescript-eslint/quotes */
import { defineConfig } from 'vite'
// correct version of federation https://github.com/originjs/vite-plugin-federation/issues/670
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const LOCAL_ENV_PORT = 40100
const BOOKS_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4005

// if (VITE_BASE_URL === undefined) set default local docker url
const LAYOUT_URL = process.env.VITE_BASE_URL ?? `http://localhost:4455`

// for run in local docker use `/`, and for others use `/books` path
const BOOKS_PATH = LAYOUT_URL === `http://localhost:4455` ? `/` : `/books`

// for run in local docker use `http://localhost:4455/assets..`, and for others use `../layout/assets..` path
const LAYOUT_PATH = LAYOUT_URL === `http://localhost:4455` ? `` : `/layout`

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: BOOKS_PORT,
  },
  // `/` for local docker
  // `/books` for local-env and prod
  base: BOOKS_PATH,
  plugins: [
    react(),
    svgr(),
    federation({
      // Unique name for the application
      name: "inner_circle_books_ui",
      filename: "inner_circle_books_ui.js",
      // The path where the remote application file can be found and its name
      remotes: {
        // `http://localhost:4455/assets/inner_circle_layout_ui.js` for local docker
        // `http://localhost:40100/layout/assets/inner_circle_layout_ui.js` for local-env
        inner_circle_layout_ui: `${LAYOUT_URL}${LAYOUT_PATH}/assets/inner_circle_layout_ui.js`,
      },
      shared: [
        "react",
      ],
    }),
  ],
  define: {
    'import.meta.env.VITE_BASE_PATH': JSON.stringify(
      process.env.NODE_ENV === `production` ? `/books` : ``,
    ),
    define: {
      'import.meta.env.VITE_BASE_URL': process.env.VITE_BASE_URL,
    },
  },
  build: {
    // Setting the target browser version for the build
    target: `esnext`,
  },
})
