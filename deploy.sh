#!/bin/bash

show_help() {
  echo "Usage:       $0 [options]"
  echo "Test deploy: $0"
  echo "Prod deploy: $0 --prod"
  echo
  echo "Options:"
  echo "--help       | Show this help message"
  echo "--prod       | Deploy in production, requires confirmation"
  echo "--skip-build | Skips react build, just deploys build folder content"
}

FRONTEND_NAME="test.teloregaloselovieniaprendere.it"
DEPLOY_PROD=false
BUILD=true
AWS_PROFILE="default"


for arg in "$@"; do
  if [ "$arg" == "--prod" ]; then
    FRONTEND_NAME="www.teloregaloselovieniaprendere.it"
    DEPLOY_PROD=true
  elif [ "$arg" == "--skip-build" ]; then
    BUILD=false
  elif [[ "$arg" == --profile=* ]]; then
    AWS_PROFILE="${arg#*=}"
  else
    show_help
    exit 1
  fi
done

if [ $DEPLOY_PROD = true ]; then
  echo "Stai deployando in produzione stronzetto, se fai danni sono cazzi tuoi.
Sicuro di continuare? (y/n)"
  read -r confirmation
  if [[ ! "$confirmation" =~ ^[Yy]$ ]]; then
    exit 1
  fi

  if [ $BUILD = true ]; then
    npm run build-prod
  fi
elif [ $BUILD = true ]; then
  npm run build-test
fi

if [ $? -ne 0 ]; then
  echo "Build failed, deploy aborted"
  exit 1
fi

aws s3 sync build s3://${FRONTEND_NAME}/ --delete

if [ $? -ne 0 ]; then
  echo "Deploy failed"
  exit 1
fi


if [ $DEPLOY_PROD = true ]; then
  aws cloudfront create-invalidation --distribution-id E2L12B5OKZ4KWH --paths "/*"
  aws cloudfront create-invalidation --distribution-id E1JAOIHGXR4YU6 --paths "/*"
else
  aws cloudfront create-invalidation  --distribution-id E1JZEK8X9KV2Y3 --paths "/*"
fi

if [ $? -ne 0 ]; then
  echo "Cloufront ${CLOUDFRONT_ID} cache not cleared!"
  exit 1
fi