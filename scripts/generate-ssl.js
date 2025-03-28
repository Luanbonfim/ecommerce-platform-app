const fs = require('fs');
const path = require('path');
const forge = require('node-forge');

// Create SSL directory if it doesn't exist
const sslDir = path.join(__dirname, '..', 'ssl');
if (!fs.existsSync(sslDir)) {
    fs.mkdirSync(sslDir);
}

// Generate SSL certificate using node-forge
const keyPath = path.join(sslDir, 'localhost.key');
const certPath = path.join(sslDir, 'localhost.crt');

// Generate a keypair
const keys = forge.pki.rsa.generateKeyPair(4096);

// Create a certificate
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

// Add subject and issuer
const attrs = [{
    name: 'commonName',
    value: 'localhost'
}, {
    name: 'organizationName',
    value: 'Local Development'
}, {
    shortName: 'ST',
    value: 'Local'
}, {
    name: 'countryName',
    value: 'US'
}];

cert.setSubject(attrs);
cert.setIssuer(attrs);

// Sign the certificate
cert.sign(keys.privateKey);

// Convert to PEM format
const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
const certificatePem = forge.pki.certificateToPem(cert);

// Save the private key and certificate
fs.writeFileSync(keyPath, privateKeyPem);
fs.writeFileSync(certPath, certificatePem);

console.log('SSL certificates generated successfully!'); 