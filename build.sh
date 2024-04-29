rm -rf ./dist 
mkdir dist 
rollup src/index.ts --config rollup.config.cjs.js
rollup src/index.ts --config rollup.config.js

