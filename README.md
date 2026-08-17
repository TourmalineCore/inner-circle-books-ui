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

to run test in local-env you need `cypress.config.local-env.ts` file and use command

```
npm run cypress:run:e2e:local-env
```

to run e2e against the mocked API from `npm run local-services:up` (no local-env or prod config needed), first make sure `npm start` is running, then use

```
npm run cypress:run:e2e:docker-compose
```
