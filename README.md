<h1 align="center">BONDE</h1>

<p align="center">
  <img
    src="https://s3.amazonaws.com/hub-central/uploads/logo-nossas-20170517185909.svg"
    width="320"
    height="320"
    alt="BONDE Logo"
  />
  <br />
  <p style="margin-top: 50px" align="center">
    <a href="http://ci.bonde.org/nossas/bonde-client">
      <img
        alt="Build Status"
        src="http://ci.bonde.org/api/badges/nossas/bonde-client/status.svg"
      />
    </a>
    <a href="https://github.com/nossas/bonde-client/issues">
      <img
        alt="Opened Issues Count"
        src="https://img.shields.io/github/issues-raw/nossas/bonde-client.svg"
      />
    </a>
    <br />
    <a href="https://hub.docker.com/r/nossas/bonde-client">
      <img
        alt="Docker Automated Deploy"
        src="https://img.shields.io/docker/automated/nossas/bonde-client.svg"
      />
    </a>
    <a href="https://hub.docker.com/r/nossas/bonde-client/builds">
      <img
        alt="Docker Build Status"
        src="https://img.shields.io/docker/build/nossas/bonde-client.svg"
      />
    </a>
    <br />
    <a href="https://github.com/nossas/bonde-client/blob/master/LICENSE">
      <img
        alt="Licence"
        src="https://img.shields.io/github/license/nossas/bonde-client.svg"
      />
    </a>
    <a href="https://conventionalcommits.org">
      <img
        alt="Conventional Commits"
        src="https://img.shields.io/badge/Conventional%20Commits-1.0.0--beta.1-brightgreen.svg"
      />
    </a>
  </p>
</p>

# Understanding the Client Setup

Build and tests based on [Create React App with Typescript](https://create-react-app.dev/)

**Commands**

- Tests:

```sh
pnpm m run tests # pnpm m run coverage
```

- Development server:

```sh
pnpm m run start
```

- Production build:

```sh
pnpm m run build
# pnpm m run start
```


## How to add new env variables to build

Add them inside the `.drone.yml` file. That's where our CI setup lives, so when needed, add enviroment variables inside the "enviroment" indentation.

```yml
  build:
    enviroment: 
      - ENV=FOOBAR
```

You'll need to specify them inside the "build" (staging) and "production-build" (production) indentation. Therefore, change the env according to what you'll need in each enviroment.

PS: Don't add secret envs in there, this file is public and so will be the tokens/sensity info you'll be inserting there.
