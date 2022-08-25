#!/bin/bash

cd ./build
FILES=$(find * -type f | awk -v q="'" '{print " -F " q "file=@\"" $0 "\";filename=\"" $0 "\"" q}')
curl "https://ipfs.infura.io:5001/api/v0/add?pin=true&recursive=true&wrap-with-directory=true&cid-version=1" -vv -X POST $FILES -u "PROJECT_ID:API_KEY_SECRET"
cd ..

#REmenber that PROJECT_ID:API_KEY_SECRET are on infura https://infura.io/dashboard/ipfs/2DqvKUXZ5UTUAxcUGBSmAKKIYHP/settings