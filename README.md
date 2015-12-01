[![Build Status](https://travis-ci.org/meurio/hub-client.svg?branch=master)](https://travis-ci.org/meurio/hub-client)
[![Dependencies
Status](https://david-dm.org/meurio/hub-client.svg)](https://david-dm.org/meurio/hub-client)
[![Dev Dependencies
Status](https://david-dm.org/meurio/hub-client/dev-status.svg)](https://david-dm.org/meurio/hub-client#info=devDependencies)

# Hub Client
## Configuration
Hub Client app depends on the host name to decide how to behave, considering this you should [setup a wildcard DNS domain](http://asciithoughts.com/posts/2014/02/23/setting-up-a-wildcard-dns-domain-on-mac-os-x/) on the development environment.
## Install
```
npm install
npm run dev
```
And you are done!

## Tests
As simples as:
```
npm run test
```
Now sit and relax.

## Deploy
### Staging
Go to the ```heroku``` branch
```
git checkout heroku
```

Merge your changes to the ```heroku``` branch
```
git merge master
```

Rebuild the static files
```
npm run build
```

Add the new build
```
git add -f static/dist
```

Commit the changes
```
git commit -am "Rebuild project"
```

Push to Github
```
git push origin heroku
```

### Production
Promote staging to production
```
heroku pipeline:promote --app hub-client-staging
```

## Links
- [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/888220)
- [Invision](https://projects.invisionapp.com/share/763UO3YDT#/screens)
- [Zeplin](https://app.zeplin.io/project.html#pid=55d1d57e14a5317a0e909551)
