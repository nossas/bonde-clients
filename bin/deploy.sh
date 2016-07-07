#!/bin/bash -e

rm -rf ~/.dokku
git clone https://github.com/dokku/dokku.git ~/.dokku

DOKKU_HOST="reboo-staging.org"
if [[ "$CIRCLE_BRANCH" == "master" ]]; then
  DOKKU_HOST="reboo.org"
fi

REPO_URI="dokku@$DOKKU_HOST:000-client"
# REPO_SSL="dokku@$DOKKU_HOST:000-client-ssl"

git remote add dokku $REPO_URI
# git remote add dokku-ssl $REPO_SSL

git push -f dokku $CIRCLE_SHA1:refs/heads/master
