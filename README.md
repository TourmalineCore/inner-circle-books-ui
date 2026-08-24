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

```
npm ci

npm start
```

To stop and remove the containers:

```
npm run local-services:down
```

This doesn't stop the layout-ui container. layout-ui runs in its own, separately named Docker project (inner-circle-layout-ui), not in the books-ui project. A developer will likely want to run several services locally that depend on layout-ui, so it runs as a single shared instance instead of each service starting its own container. Stop it explicitly when you no longer need it:

```
npm run local-services:down:layout-ui
```

## Run against a different books-api version

By default `npm start` pulls and runs the `latest` published `inner-circle-books-api` image. To test against a different version, set `IMAGE_TAG` in the terminal right before `npm start`.

Every push to an open `inner-circle-books-api` pull request publishes a Docker image tagged `sha-<short commit sha>`. Use that tag:

```
IMAGE_TAG=sha-2a3f277 npm start
```

If Docker can't find that tag, check the PR's CI run to see which commit sha was actually built, and use that tag instead.

To go back to `latest`, just run `npm start` without setting `IMAGE_TAG`.

### Also test against that branch's mock server data

`IMAGE_TAG` only changes the Docker image. It does not change where `mock-server-initialization.json` and `api-docker-compose.yml` come from. Those always come from `master` by default. If your feature branch also changed those files, also set `API_REF` (git branch name used to fetch files from GitHub):

```
IMAGE_TAG=sha-2a3f277 API_REF=my-feature-branch npm start
```

## Develop books-ui together with locally running layout-ui

To develop books-ui together with a locally running layout-ui, follow these steps:

1. In clone repo `inner-circle-layout-ui`, run:

```
npm run start:federation
```

Plain `npm start` there doesn't work for this: `vite-plugin-federation` only builds the remote entry file during `vite build`, not in the dev. `start:federation` rebuilds on every change and serves the result on port 4006. There is no hot reload, so refresh the browser manually after each change.

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

This starts the shared layout-ui Docker container (books-ui doesn't touch books-api's containers) and points the `/api/books` proxy at `localhost:7000` instead of the Docker container.

If you're running books-ui inside a Dev Container while books-api runs natively on the host (not in Docker), this is handled automatically: `localhost` inside a container is its own loopback, not the host's, so the proxy detects it's running inside a container and uses `host.docker.internal` instead.

2. In `inner-circle-books-api`, run it the same way described in its own README's "Run in Visual Studio" section: 

```
docker compose --profile MockForDevelopment up --build
```

 for its db and mock-server, then 

 ```
 dotnet run --project ./Api --verbosity detailed
 ```
for the API itself.

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
