# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.5.11"></a>
## [0.5.11](https://github.com/nossas/bonde-client/compare/v0.5.10...v0.5.11) (2017-07-09)


### Bug Fixes

* **community:** normalize recipient document number fix [#737](https://github.com/nossas/bonde-client/issues/737) ([b3b9648](https://github.com/nossas/bonde-client/commit/b3b9648))
* **subscription:** undefined last donation card data fix [#732](https://github.com/nossas/bonde-client/issues/732) ([b339bbc](https://github.com/nossas/bonde-client/commit/b339bbc))



<a name="0.5.10"></a>
## [0.5.10](https://github.com/nossas/bonde-client/compare/v0.5.8...v0.5.10) (2017-06-29)


### Bug Fixes

* **auth:** load current user in authenticated container ([6716857](https://github.com/nossas/bonde-client/commit/6716857))
* **ci:** staging app container deploy command fix [#706](https://github.com/nossas/bonde-client/issues/706) ([7989c05](https://github.com/nossas/bonde-client/commit/7989c05))
* **community:** set user role on invitation request fix [#693](https://github.com/nossas/bonde-client/issues/693) ([6786eef](https://github.com/nossas/bonde-client/commit/6786eef))
* **custom_domain:** change regex to check valid domain [#698](https://github.com/nossas/bonde-client/issues/698) ([9e4679e](https://github.com/nossas/bonde-client/commit/9e4679e))
* **mobilization:** change background image from block [#703](https://github.com/nossas/bonde-client/issues/703) ([d769db0](https://github.com/nossas/bonde-client/commit/d769db0))


### Features

* **account:** enable network-only on fetch current user [#706](https://github.com/nossas/bonde-client/issues/706) ([275fd1b](https://github.com/nossas/bonde-client/commit/275fd1b))
* **admin:** add bonde favicons close [#682](https://github.com/nossas/bonde-client/issues/682) ([23921c1](https://github.com/nossas/bonde-client/commit/23921c1))
* **auth:** add handle to request 401 on API Rest [#672](https://github.com/nossas/bonde-client/issues/672) ([0c1dd04](https://github.com/nossas/bonde-client/commit/0c1dd04))
* **auth:** add handle to request 401 SSR [#672](https://github.com/nossas/bonde-client/issues/672) ([1a9dff4](https://github.com/nossas/bonde-client/commit/1a9dff4))
* **community:** metrics [#677](https://github.com/nossas/bonde-client/issues/677) ([d009230](https://github.com/nossas/bonde-client/commit/d009230))
* **components:** title and subtitle to standardize style [#700](https://github.com/nossas/bonde-client/issues/700) ([0f5d87a](https://github.com/nossas/bonde-client/commit/0f5d87a))
* **custom-domain:** add validation for subdomain [#698](https://github.com/nossas/bonde-client/issues/698) ([16ccde3](https://github.com/nossas/bonde-client/commit/16ccde3))
* **intl:** community basic info page [#675](https://github.com/nossas/bonde-client/issues/675) ([704ecfd](https://github.com/nossas/bonde-client/commit/704ecfd))
* **intl:** community mailchimp page [#675](https://github.com/nossas/bonde-client/issues/675) ([4e90ac6](https://github.com/nossas/bonde-client/commit/4e90ac6))
* **intl:** community recipient page close [#675](https://github.com/nossas/bonde-client/issues/675) ([9313cd1](https://github.com/nossas/bonde-client/commit/9313cd1))
* **mobilizations:** metrics close [#677](https://github.com/nossas/bonde-client/issues/677) ([eaeb0ee](https://github.com/nossas/bonde-client/commit/eaeb0ee))
* **mobrender:** add colorpicker from change background [#704](https://github.com/nossas/bonde-client/issues/704) ([e3ac55d](https://github.com/nossas/bonde-client/commit/e3ac55d))
* **packages:** upgrade slate-editor to v2.6.6 close [#688](https://github.com/nossas/bonde-client/issues/688) ([f0b4fb4](https://github.com/nossas/bonde-client/commit/f0b4fb4))
* **subscription:** option to cancel the subscription close [#683](https://github.com/nossas/bonde-client/issues/683) ([8ef482a](https://github.com/nossas/bonde-client/commit/8ef482a))



<a name="0.5.9"></a>
## [0.5.9](https://github.com/nossas/bonde-client/compare/v0.5.8...v0.5.9) (2017-06-27)


### Bug Fixes

* **pressure-widget:** avoid self pressure email fix [#713](https://github.com/nossas/bonde-client/issues/713) ([64b0a40](https://github.com/nossas/bonde-client/commit/64b0a40))


<a name="0.5.8"></a>
## [0.5.8](https://github.com/nossas/bonde-client/compare/v0.5.7...v0.5.8) (2017-06-15)


### Bug Fixes

* **auth:** change fields for work with fetch user by graphql [#661](https://github.com/nossas/bonde-client/issues/661) ([6cdccc3](https://github.com/nossas/bonde-client/commit/6cdccc3))
* **client:** install raven only in production / test ([578fd0f](https://github.com/nossas/bonde-client/commit/578fd0f))
* **mobilizations:** redirect after create mobilization fix [#662](https://github.com/nossas/bonde-client/issues/662) ([efffbb7](https://github.com/nossas/bonde-client/commit/efffbb7))
* **packages:** force slate-editor upgrade to v2.6.5 [#654](https://github.com/nossas/bonde-client/issues/654) ([039f65d](https://github.com/nossas/bonde-client/commit/039f65d))
* **packages:** slate-editor semver install minor version fix [#654](https://github.com/nossas/bonde-client/issues/654) ([dba5c55](https://github.com/nossas/bonde-client/commit/dba5c55))
* **raven:** not install raven in development env ([b53da1f](https://github.com/nossas/bonde-client/commit/b53da1f))


### Features

* **account:** use graphql for user authentication [#624](https://github.com/nossas/bonde-client/issues/624) ([4953fac](https://github.com/nossas/bonde-client/commit/4953fac))
* **account-retrieve:** account password recovering [#659](https://github.com/nossas/bonde-client/issues/659) ([32d59e4](https://github.com/nossas/bonde-client/commit/32d59e4))
* **auth:** add authentication by JWT token in apollo client [#661](https://github.com/nossas/bonde-client/issues/661) ([7255c80](https://github.com/nossas/bonde-client/commit/7255c80))
* **community:** invite members to community [#660](https://github.com/nossas/bonde-client/issues/660) ([e3a213b](https://github.com/nossas/bonde-client/commit/e3a213b))
* **graphql:** add config for authenticate with graphql. closes [#624](https://github.com/nossas/bonde-client/issues/624) ([8c599b8](https://github.com/nossas/bonde-client/commit/8c599b8))
* **graphql:** add graphql service on listening port 3003 [#621](https://github.com/nossas/bonde-client/issues/621) ([d772183](https://github.com/nossas/bonde-client/commit/d772183))
* **graphql:** add react-apollo [#622](https://github.com/nossas/bonde-client/issues/622) ([a38d803](https://github.com/nossas/bonde-client/commit/a38d803))
* **pressure-widget:** support to insert multiple targets [#657](https://github.com/nossas/bonde-client/issues/657) ([9607b2d](https://github.com/nossas/bonde-client/commit/9607b2d))



<a name="0.5.7"></a>
## [0.5.7](https://github.com/nossas/bonde-client/compare/v0.5.6...v0.5.7) (2017-06-07)


### Bug Fixes

* **ci:** change deploy server address ([168f4fb](https://github.com/nossas/bonde-client/commit/168f4fb))



<a name="0.5.6"></a>
## [0.5.6](https://github.com/nossas/bonde-client/compare/v0.5.5...v0.5.6) (2017-06-07)


### Bug Fixes

* **community:** change field name for custom default email [#639](https://github.com/nossas/bonde-client/issues/639) ([004ad51](https://github.com/nossas/bonde-client/commit/004ad51))
* **community:** fix warns about lint ([2bcf65b](https://github.com/nossas/bonde-client/commit/2bcf65b))
* **community:** try exception 401 with logout in fetch community [#630](https://github.com/nossas/bonde-client/issues/630) ([bc05159](https://github.com/nossas/bonde-client/commit/bc05159))
* **dns:** add click in domain preview on list dns community [#632](https://github.com/nossas/bonde-client/issues/632) ([ce4a162](https://github.com/nossas/bonde-client/commit/ce4a162))
* **packages:** upgrade slate-editor to v2.6.4 ([bafcf0b](https://github.com/nossas/bonde-client/commit/bafcf0b))
* **raven:** not install raven in development env ([c72ae55](https://github.com/nossas/bonde-client/commit/c72ae55))
* **widgets:** ensure async refetch to update on cache close [#637](https://github.com/nossas/bonde-client/issues/637) ([39d4b01](https://github.com/nossas/bonde-client/commit/39d4b01))


### Features

* **auth:** add redirect to logout on action. closes [#630](https://github.com/nossas/bonde-client/issues/630) ([a40e476](https://github.com/nossas/bonde-client/commit/a40e476))
* **community:** add translate for domain notification [#632](https://github.com/nossas/bonde-client/issues/632) ([912e072](https://github.com/nossas/bonde-client/commit/912e072))
* **dns:** add delegation servers name when detail a domain settings [#633](https://github.com/nossas/bonde-client/issues/633) ([79d4ca4](https://github.com/nossas/bonde-client/commit/79d4ca4))
* **dns:** add help text in records section [#633](https://github.com/nossas/bonde-client/issues/633) ([b65f66d](https://github.com/nossas/bonde-client/commit/b65f66d))
* **dns:** add notification with result of check dns [#632](https://github.com/nossas/bonde-client/issues/632) ([0b5cbe2](https://github.com/nossas/bonde-client/commit/0b5cbe2))
* **dns:** change labels in settings dns page [#633](https://github.com/nossas/bonde-client/issues/633) ([fb51c1e](https://github.com/nossas/bonde-client/commit/fb51c1e))
* **forms:** add plus possibility for render raise field [#631](https://github.com/nossas/bonde-client/issues/631) ([a5082a0](https://github.com/nossas/bonde-client/commit/a5082a0))
* **forms:** add possibility to change style tag in form redux ([7788b06](https://github.com/nossas/bonde-client/commit/7788b06))
* **forms:** add possibility to insert addon text on input [#633](https://github.com/nossas/bonde-client/issues/633) ([3e06511](https://github.com/nossas/bonde-client/commit/3e06511))
* **i18n:** add translation en to community domain page [#633](https://github.com/nossas/bonde-client/issues/633) ([628ab8d](https://github.com/nossas/bonde-client/commit/628ab8d))
* **mobilizations:** add animated counter to widgets [#637](https://github.com/nossas/bonde-client/issues/637) ([cce9bba](https://github.com/nossas/bonde-client/commit/cce9bba))
* **mobilizations:** add en translate for notification to update dns [#631](https://github.com/nossas/bonde-client/issues/631) ([b9234d6](https://github.com/nossas/bonde-client/commit/b9234d6))
* **mobilizations:** edit slug field [#631](https://github.com/nossas/bonde-client/issues/631) ([9a3a2de](https://github.com/nossas/bonde-client/commit/9a3a2de))
* **mobilizations:** reject errors passed by api on add and update actions [#631](https://github.com/nossas/bonde-client/issues/631) ([e77368d](https://github.com/nossas/bonde-client/commit/e77368d))
* **packages:** add react-countup [#637](https://github.com/nossas/bonde-client/issues/637) ([6369108](https://github.com/nossas/bonde-client/commit/6369108))
* **string-helper:** add slugify function [#631](https://github.com/nossas/bonde-client/issues/631) ([853a741](https://github.com/nossas/bonde-client/commit/853a741))
* **ux:** add background fixed to dialog [#632](https://github.com/nossas/bonde-client/issues/632) ([f9dd06f](https://github.com/nossas/bonde-client/commit/f9dd06f))



<a name="0.5.5"></a>
## [0.5.5](https://github.com/nossas/bonde-client/compare/v0.5.4...v0.5.5) (2017-06-01)


### Bug Fixes

* **packages:** upgrade slate-editor to v2.6.4 ([747fc45](https://github.com/nossas/bonde-client/commit/747fc45))



<a name="0.5.4"></a>
## [0.5.4](https://github.com/nossas/bonde-client/compare/v0.5.3...v0.5.4) (2017-05-31)


### Bug Fixes

* **community-recipient:** change style of pagarme warning ([0721e34](https://github.com/nossas/bonde-client/commit/0721e34))
* **packages:** upgrade slate-editor to v2.6.3 ([134145f](https://github.com/nossas/bonde-client/commit/134145f))



<a name="0.5.3"></a>
## [0.5.3](https://github.com/nossas/bonde-client/compare/v0.5.2...v0.5.3) (2017-05-31)


### Bug Fixes

* **community:** add range to select transfer day on recipient register. closes [#615](https://github.com/nossas/bonde-client/issues/615) ([92de1a5](https://github.com/nossas/bonde-client/commit/92de1a5))


### Features

* **intl:** add app translation keys close [#614](https://github.com/nossas/bonde-client/issues/614) ([0edbd86](https://github.com/nossas/bonde-client/commit/0edbd86))
* **intl:** add incoming v0.6.x keys close [#614](https://github.com/nossas/bonde-client/issues/614) ([51690b0](https://github.com/nossas/bonde-client/commit/51690b0))
* **routes:** update the `yarn routes` command [#584](https://github.com/nossas/bonde-client/issues/584) ([123c19e](https://github.com/nossas/bonde-client/commit/123c19e))



<a name="0.5.2"></a>
## [0.5.2](https://github.com/nossas/bonde-client/compare/v0.5.1...v0.5.2) (2017-05-23)


### Bug Fixes

* **community:** add range to select transfer day on recipient register. closes [#615](https://github.com/nossas/bonde-client/issues/615) ([62e363a](https://github.com/nossas/bonde-client/commit/62e363a))
* **custom_domain:** Change protocol to be loaded from state ([670ad52](https://github.com/nossas/bonde-client/commit/670ad52))
* **fetch:** add credentials for fetch mobilizations and communities [#590](https://github.com/nossas/bonde-client/issues/590) ([9f1e10a](https://github.com/nossas/bonde-client/commit/9f1e10a))
* **form-widget:** input type as email by field kind close [#544](https://github.com/nossas/bonde-client/issues/544) ([5c5fc3a](https://github.com/nossas/bonde-client/commit/5c5fc3a))
* **lint:** components standardjs auto fix [#554](https://github.com/nossas/bonde-client/issues/554) ([e483db1](https://github.com/nossas/bonde-client/commit/e483db1))
* **lint:** components standardjs manual fixes close [#554](https://github.com/nossas/bonde-client/issues/554) ([49f71e9](https://github.com/nossas/bonde-client/commit/49f71e9))
* **packages:** slate-editor edit image plugin layout [#546](https://github.com/nossas/bonde-client/issues/546) ([66e765b](https://github.com/nossas/bonde-client/commit/66e765b))
* **packages:** upgrade slate-editor to v2.3.1 [#340](https://github.com/nossas/bonde-client/issues/340) ([35cf180](https://github.com/nossas/bonde-client/commit/35cf180))
* **readme:** licence badge link ([99cafe4](https://github.com/nossas/bonde-client/commit/99cafe4))
* **render:** remove credentials to request block and widgets filtered by mobilization ([e5a47c7](https://github.com/nossas/bonde-client/commit/e5a47c7))
* **server:** remove www blacklist rule close [#611](https://github.com/nossas/bonde-client/issues/611) ([8773c3c](https://github.com/nossas/bonde-client/commit/8773c3c))
* **webpack:** remove the verbose of heroku-postbuild ([16a509e](https://github.com/nossas/bonde-client/commit/16a509e))


### Features

* **dns:** put www by default on regiter domain to mobilization [#609](https://github.com/nossas/bonde-client/issues/609) ([26d6227](https://github.com/nossas/bonde-client/commit/26d6227))
* **intl:** react-intl ssr and client implementation close [#340](https://github.com/nossas/bonde-client/issues/340) ([7ad0be4](https://github.com/nossas/bonde-client/commit/7ad0be4))
* **packages:** add standard-version close [#546](https://github.com/nossas/bonde-client/issues/546) ([0f2840b](https://github.com/nossas/bonde-client/commit/0f2840b))
