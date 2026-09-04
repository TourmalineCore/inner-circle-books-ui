# builds env-config.js for a local run. The image this repo publishes gets the file from ci/env.sh,
# which its entrypoint runs before nginx with the values the cluster passes in.
# here that very same script runs with the values the Dev Container passes in (containerEnv in devcontainer.json)

# env.sh is not executable in the repo, only the copy the Dockerfile makes is, so it is invoked through bash.
# it reads .env-vars and writes env-config.js relative to the working directory, which npm run sets to the repo root
bash ./ci/env.sh

# the dev server serves public/, cypress reads its own copy
mv ./env-config.js ./public/env-config.js
cp ./public/env-config.js ./cypress/env-config.js
