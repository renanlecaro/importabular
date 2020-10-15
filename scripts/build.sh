
rm -rf dist/*


# generate the main dist file
node scripts/remove-exports.js | \
  npx babel --no-babelrc --plugins=@babel/proposal-class-properties  | \
  terser --module --compress --mangle --module  \
    --mangle-props regex=/^_/ --ecma 5 --output dist/index.js

# to calculate the gzipped size
gzip -k dist/index.js

# for inspection of the generated content
cp dist/index.js dist/index-readable.js
prettier --write dist/index-readable.js

ls -l dist

