[![Build Status](https://travis-ci.org/meurio/hub-client.svg?branch=master)](https://travis-ci.org/meurio/hub-client)

# Hub Client
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
