# To make it really easy to work with the outputs file from the manager, 
# this script converts the JSON file into a typescript file

# Remove old transpiled outputs from the deployments/ directory
rm -f deployments/outputs.ts

# Transform raw JSON artifacts into Typescript modules.  This makes
# interacting with the artifacts significantly easier when exporting
# them as modules.

for filename in abis/json/*.json; do
    filename_base=$(basename $filename .json)
    echo -e "export const $filename_base = " > "abis/ts/$filename_base.ts"
    cat "abis/json/$filename_base.json" >> "abis/ts/$filename_base.ts"

    echo -e "Transpiled $filename_base.json into $filename_base.ts"
done