#!/bin/bash

NODE_ENV=production webpack

# Gzipp size check
gzip -k ./dist/index.js
gzip -k ./dist/withHeaders.js

# Pretty copy
cp ./dist/index.js ./dist/index-pretty.js
prettier --write  ./dist/index-pretty.js

cp ./dist/withHeaders.js ./dist/withHeaders-pretty.js
prettier --write  ./dist/withHeaders-pretty.js

ls -l  ./dist/

#-rm -rf dist/*
#-
#-
#-# generate the main dist file
#-node scripts/remove-exports.js | \
#-  terser --module --mangle --module  --mangle-props regex=/^_/ --ecma 5 | \
#-  npx babel --no-babelrc --plugins=@babel/proposal-class-properties  | \
#-  terser --module --compress --mangle --module --ecma 5 --output dist/index.js
#-
#-# to calculate the gzipped size
#-gzip -k dist/index.js
#-
#-# for inspection of the generated content
#-cp dist/index.js dist/index-readable.js
#-prettier --write dist/index-readable.js
#-
#-ls -l dist
