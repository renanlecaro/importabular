#!/bin/bash

NODE_ENV=production webpack

# Gzipp size check
gzip -kf ./dist/index.js
# Pretty copy
cp ./dist/index.js ./dist/index-pretty.js
prettier --write  ./dist/index-pretty.js


ls -l  ./dist/
