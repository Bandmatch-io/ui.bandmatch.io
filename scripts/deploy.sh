#!/bin/bash

git pull
npm run generate
pm2 restart ui.bandmatch.io