rm -rf ./dist 
mkdir dist 
tsc --project tsconfig.cjs.json 
tsc --project tsconfig.json
find dist/cjs -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.cjs"' {} \;
