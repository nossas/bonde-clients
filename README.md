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

* [Concepts & good patterns
  (pt-br)](https://github.com/nossas/bonde-client/wiki/Conceitos-e-boas-pr%C3%A1ticas)

## Configuration

Bonde Client app depends on the host name to decide how to behave, considering this you should [setup a wildcard DNS domain](http://asciithoughts.com/posts/2014/02/23/setting-up-a-wildcard-dns-domain-on-mac-os-x/) on the development environment.

Or you could simple add to your `/etc/hosts` the following names:

``` bash
127.0.0.1 bonde.devel app.bonde.devel admin-canary.bonde.devel cross-storage.bonde.devel chatbot.bonde.devel
```

This repository focus mainly on the setup for the client side of BONDE's apps. To a more detailed description on how to setup BONDE's arquitecture check out [bonde-install](https://github.com/nossas/bonde-install).

## Install

### Requirements

* Git
* [Yarn](https://yarnpkg.com/) (optional)
* [Lerna](https://lernajs.io/) (required)

``` bash
$ git --version
git version 2.7.4
$ yarn --version
1.19.1
```

### Manual

``` bash
mkdir bonde/ && cd bonde/
git clone git@github.com:nossas/bonde-client.git
cd bonde-client
```

To configure packages, we use .env files, examples could be founded at each package.

With help from Yarn and Lerna, install dependencies:

### Local Development

``` bash
yarn install
yarn lerna bootstrap
yarn lerna run dev --parallel
```

If you'd like to run selected packages, use the `--scope` command:

`yarn lerna run dev --scope="bonde-admin" --scope="bonde-admin-canary`

And you are done!

### Preview New Mobilization

To preview a new mobilization you created locally, check your mobilization unique identifier (slug) in settings and add it to your `/etc/hosts` file:

`127.0.0.1 www.(slug).bonde.devel`

To access it, go to `www.(slug).bonde.devel:(port)` using the port number setup on the `.env` file in the `bonde-public` package.

### Tests

As simples as:

`yarn lerna run test --parallel`

Now sit and relax.

If you want to test a single file you can temporarily change the first line of `webpack.test.config.js` to:

``` bash
var context = require.context('./app/scripts/tests', true, /MyComponentTest\.jsx/);
```

### Useful commands

``` bash
yarn lerna run build --parallel
```

And you are done!

## Links

* [How to contribute](CONTRIBUTING.md)
* [Zeplin](https://app.zeplin.io/)
* [Zenhub](https://app.zenhub.com/)
