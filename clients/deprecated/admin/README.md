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

---

[![Greenkeeper badge](https://badges.greenkeeper.io/nossas/bonde-client.svg)](https://greenkeeper.io/)

## Recommended Reading

- [Concepts & good patterns
  (pt-br)](https://github.com/nossas/bonde-client/wiki/Conceitos-e-boas-pr%C3%A1ticas)

## Configuration

Bonde Client app depends on the host name to decide how to behave, considering this you should [setup a wildcard DNS domain](http://asciithoughts.com/posts/2014/02/23/setting-up-a-wildcard-dns-domain-on-mac-os-x/) on the development environment.

Or you could simple add to your `/etc/hosts` the following names:

```bash
127.0.0.1 bonde.devel app.bonde.devel admin-canary.bonde.devel cross-storage.bonde.devel chatbot.bonde.devel
```

This repository focus mainly on the setup for the client side of BONDE's apps. To a more detailed description on how to setup BONDE's arquitecture check out [bonde-install](https://github.com/nossas/bonde-install).

## Install

### Requirements

- Git (required)
- NodeJS 14 (required) `nvm install 14 && nvm use 14`
- [Pnpm](https://pnpm.io/) (required) `curl -fsSL https://get.pnpm.io/install.sh | sh -`

```bash
$ git --version
git version 2.7.4
$ node --version
v14.18.3
$ pnpm --version
6.26.1
```

### Manual

```bash
mkdir bonde/ && cd bonde/
git clone git@github.com:nossas/bonde-client.git
cd bonde-client
```

To configure packages, we use .env files, examples could be founded at each package.

With help from Pnpm, install dependencies:

### Local Development

```bash
cd clients/deprecated/admin
pnpm i
pnpm m run dev
```

If you'd like to run selected packages, use the `--filter` command:

`pnpm m run dev --filter="bonde-admin"`

And you are done!

### Admin Dependencies

You will need to update .env file in bonde-admin to proper use of graphql api.

We use an api rest to upload images.

And as a logged in section you will need to be authenticated.

### Tests

As simples as:

`pnpm m run test`

## Links

- [How to contribute](CONTRIBUTING.md)
