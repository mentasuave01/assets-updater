const fs = require('fs');
const https = require('https');
const path = require('path');
// Spooky supported networks:
//  fantom, horizen, bit_torrent
const networkName = 'bit_torrent';
const list = require('./tokenlist/btt_spooky_tokens.json');
const tokens = list.tokens;


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadImage(url, filePath) {
    console.log(`Downloading ${url}`);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const file = fs.createWriteStream(filePath);
    https.get(url, function (response) {
        response.pipe(file);
    });
}

async function processTokens(tokens) {
    for (const token of tokens) {
        await delay(200);
        const address = token.address;
        const logoURI = token.logoURI;
        const filePath = path.join(__dirname, `${networkName}/${address}/logo.png`);
        downloadImage(logoURI, filePath);
    }
}

processTokens(tokens);