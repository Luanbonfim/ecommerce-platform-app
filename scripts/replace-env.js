const fs = require('fs');
const path = require('path');

function replaceEnvValues(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(
    /googleClientId:\s*''/,
    `googleClientId: '${process.env.GOOGLE_CLIENT_ID}'`
  );
  
  // Write back to the file
  fs.writeFileSync(filePath, content);
}

const devEnvFile = path.join(__dirname, '../src/environments/environment.ts');
const prodEnvFile = path.join(__dirname, '../src/environments/environment.prod.ts');

replaceEnvValues(devEnvFile);
replaceEnvValues(prodEnvFile); 