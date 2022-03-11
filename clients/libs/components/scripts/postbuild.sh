# --- 1. rename dist  into __dist to signal that it is not intended for imports
rm -rf ./__dist ./form ./chakra ./icons

mv ./dist ./__dist

# --- 2. prepare root validators dir to enable imports: 'import {} from "@virtuslab/formts/validators"'

mkdir ./form ./chakra ./icons

# 'dist/esm/index2' is a chunk created for 'src/rewrites/index.ts'
echo 'export * from "../__dist/esm/index2";' > ./icons/index.js

echo 'export * from "../__dist/icons";' > ./icons/index.d.ts

echo 'export * from "../__dist/esm/index3";' > ./form/index.js

echo 'export * from "../__dist/form";' > ./form/index.d.ts

echo 'export * from "../__dist/esm/index4";' > ./chakra/index.js

echo 'export * from "../__dist/chakra";' > ./chakra/index.d.ts