/* eslint-disable @typescript-eslint/quotes */
import { defineConfig } from 'vite'
// correct version of federation https://github.com/originjs/vite-plugin-federation/issues/670
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const LOCAL_ENV_PORT = 40100
const BOOKS_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4005

// for run in local docker use `http://localhost:4455/assets..`, and for others use `../layout/assets..` path
const LAYOUT_PATH = process.env.VITE_BASE_URL === `http://localhost:4455` ? `` : `/layout`

// const LAYOUT_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4006

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  server: {
    port: BOOKS_PORT,
  },
  // base: `/`, // for local docker
  base: `/books`, // for local-env
  plugins: [
    react(),
    svgr(),
    federation({
      // Unique name for the application
      name: "inner_circle_books_ui",
      filename: "inner_circle_books_ui.js",
      // The path where the remote application file can be found and its name
      remotes: {
        // inner_circle_layout_ui: `http://localhost:4455/assets/inner_circle_layout_ui.js`, // for local docker
        // inner_circle_layout_ui: `http://localhost:40100/layout/assets/inner_circle_layout_ui.js`, // for local-env
        inner_circle_layout_ui: `${process.env.VITE_BASE_URL}${LAYOUT_PATH}/assets/inner_circle_layout_ui.js`, // for prod
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
