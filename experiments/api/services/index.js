
const fs = require('fs');

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach((file) => {
    const service = file.split('.').slice(0, -1).join('.');
    global[service] = require(`./${file}`);
  });
