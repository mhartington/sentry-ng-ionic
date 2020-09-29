const fs = require("fs");
const targetPath = './src/environments/environment.prod.ts';

// Load node modules
require('dotenv').config();

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   production: true,
   release: '${process.env.version}'
};
`;

console.log('The file `environment.prod.ts` will be written with the following content:');
console.log(envConfigFile)
fs.writeFileSync(targetPath, envConfigFile)
console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
