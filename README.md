# Inner-Circle-Books

## Dev Container

This repo and its infrastructure tailored for VSCode/GitHub Codespaces Dev Container centric development experience in Docker to achieve better isolation of the environment as well as its cross-platform support out of the box. 

### Prerequisites

1. Install Docker Desktop (Windows, macOS) or Docker Engine (Linux)
2. Install Visual Studio Code.
3. Install all repo's recommended extensions including [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

### Develop inside Dev Container

Open this repo's folder in VSCode/Codespaces, it might immediately propose you to re-open it in a Dev Container or you can click on `Remote Explorer`, find plus button and choose the `Open Current Folder in Container` option and wait when it is ready.

When your Dev Container is ready, the VSCode window will be re-opened. Open a new terminal in this Dev Container which will be executing the commands under this prepared Linux container where we already have all pre-installed and pre-configured development related dependencies.

## Getting Started

```bash
# install the exact dependency versions from package-lock.json
npm ci

# start everything needed for local development: Docker services and the dev server
npm start
```

Then open http://localhost:3505.

### What `npm start` does

1. **Builds `public/env-config.js` from `.config-local`** - the runtime config the app reads in the browser.
2. **Fetches compose files from GitHub** - `docker-compose.yml` from `inner-circle-books-api` and `inner-circle-layout-ui`, plus books-api's `mock-server-initialization.json`. You don't need to clone those repos.
3. **Starts the Docker containers** - the shared layout-ui container, and books-api with its Postgres database and mock server. Published images are pulled on every run, and the command waits until the containers report healthy.
4. **Starts the Vite dev server**, which proxies `/layout` and `/api/books` to those containers.

Steps 1-3 repeat on every `npm start`, so each run starts from a fresh config and up-to-date images.

## Stop the local services

`Ctrl+C` in the dev server terminal stops only the dev server - the containers keep running. To stop and remove them:

```
npm run local-services:down
```

This doesn't stop the layout-ui container. layout-ui runs in its own, separately named Docker project (inner-circle-layout-ui), not in the books-ui project. A developer will likely want to run several services locally that depend on layout-ui, so it runs as a single shared instance instead of each service starting its own container. Stop it explicitly when you no longer need it:

```
npm run local-services:down:layout-ui
```

## Run against a books-api feature branch

By default `npm start` pulls and runs the `latest` published `inner-circle-books-api` image. To test against a different version, set `API_IMAGE_TAG` in the terminal right before `npm start`.

Every push to an open `inner-circle-books-api` pull request publishes a Docker image tagged `sha-<short commit sha>`. Use that tag:

```
API_IMAGE_TAG=sha-2a3f277 npm start
```

If Docker can't find that tag, check the PR's CI run to see which commit sha was actually built, and use that tag instead.

To go back to `latest`, just run `npm start` without setting `API_IMAGE_TAG`.

### Also test against that branch's mock server data

`API_IMAGE_TAG` only changes the Docker image. It does not change where `mock-server-initialization.json` and `api-docker-compose.yml` come from. Those always come from `master` by default. If your feature branch also changed those files, also set `API_REF` (git branch name used to fetch files from GitHub):

```
API_IMAGE_TAG=sha-2a3f277 API_REF=my-feature-branch npm start
```

## Run against a layout-ui feature branch

layout-ui has the same two switches, under its own variable names. By default `npm start` pulls the `latest` published `inner-circle-layout-ui` image and takes its `docker-compose.yml` from `master`.

`LAYOUT_IMAGE_TAG` picks the image, the same way `API_IMAGE_TAG` does for books-api:

```
LAYOUT_IMAGE_TAG=sha-9c1e044 npm start
```

`LAYOUT_REF` picks the branch its `docker-compose.yml` is fetched from. Set it when your layout-ui branch changed that file; otherwise the branch's image would still run with `master`'s compose:

```
LAYOUT_IMAGE_TAG=sha-9c1e044 LAYOUT_REF=feature/#496-add-local-run npm start
```

Branch names with a `#` in them work as-is - no quoting or escaping needed.

All four variables are independent, so you can pin both services in one run:

```
API_IMAGE_TAG=sha-2a3f277 API_REF=my-api-branch LAYOUT_IMAGE_TAG=sha-9c1e044 LAYOUT_REF=feature/#496-add-local-run npm start
```

`npm run start:for-local-books-api` reads both layout-ui variables, since it starts the layout-ui container. `npm run start:for-local-layout-ui` doesn't start that container, so `LAYOUT_IMAGE_TAG` has no effect there. `LAYOUT_REF` still picks the branch the compose file is downloaded from, but nothing in that mode uses that file.

## Develop books-ui together with locally running layout-ui

To develop books-ui together with a locally running layout-ui, follow these steps:

1. Start layout-ui from its own repo, as described in [Local run with module federation](https://github.com/TourmalineCore/inner-circle-layout-ui#local-run-with-module-federation) in the layout-ui README. books-ui expects it on port 4500.

2. In `inner-circle-books-ui`, run:

```
npm run start:for-local-layout-ui
```

This starts only the books-api Docker services (no layout-ui container) and points the `/layout` proxy at your local layout-ui instead of the shared container.

## Develop against a local books-api

To develop with local books-api, run it locally instead of the Docker container.

1. In `inner-circle-books-ui`, run:

```
npm run start:for-local-books-api
```

This starts the shared layout-ui Docker container (books-ui doesn't touch books-api's containers) and points the `/api/books` proxy at `localhost:4505` instead of the Docker container.

If you're running books-ui inside a Dev Container, this is handled automatically: `localhost` inside a container is its own loopback, not the host's or another container's, so the proxy detects it's running inside a container and uses `host.docker.internal` instead.

2. Start books-api from its own repo, as described in [Develop inside Dev Container](https://github.com/TourmalineCore/inner-circle-books-api#develop-inside-dev-container) in the books-api README. books-ui expects it on port `4505`, which is the port it listens on inside its own Dev Container.

### Also test with unpushed mock-server-initialization.json changes

By default `mock-server-initialization.json` is fetched from GitHub (`master`, or `API_REF` if set). If you're editing it locally and haven't pushed yet, set `API_LOCAL_PATH` to your local `inner-circle-books-api` checkout instead:

```
API_LOCAL_PATH=../inner-circle-books-api npm run start:for-local-books-api
```

## Create local docker container to connect it with local-env

```
npm run docker:build:local-env
```

## Create local docker container to work in it (local docker container for layout-ui service must run too)
```
npm run docker:build

npm run docker:run
```

## Component tests

To run component tests in console you need enter the command

```
npm run cypress:run:component
```

To open cypress to run component tests you need enter the command

```
npm run cypress:open:component
```

## E2E tests

to run e2e against the mocked API, first make sure `npm start` is running, then use

```
npm run cypress:run:e2e
```

to run test in local-env you need `cypress.config.local-env.ts` file and use command

```
npm run cypress:run:e2e:local-env
```
