#!/usr/bin/env bash

cd /var/www/html
mkdir -p storage

npm install
npm run build
npm run start 2>&1 | tee -a /var/www/html/storage/logs.txt
