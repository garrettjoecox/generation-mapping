
require('colorslite');
const stream = require('stream');
const config = require('../config');

module.exports = (...args) => {
  args.unshift('['.gray + config.log.prefix + ']'.gray);
  console.log.apply(console.log, args);
};

module.exports.info = (...args) => {
  args.unshift('['.gray + 'Info'.lGreen + ']'.gray);
  module.exports.apply(module.exports, args);
};

module.exports.error = (...args) => {
  args.unshift('['.gray + 'Error'.lRed + ']'.gray);
  module.exports.apply(module.exports, args);
};

module.exports.http = (...args) => {
  args.unshift('['.gray + 'HTTP'.lYellow + ']'.gray);
  module.exports.apply(module.exports, args);
};

module.exports.stream = new stream.Writable({
  write(chunk, encoding, callback) {
    chunk.toString().split('\n').forEach((line) => {
      if (line) module.exports.http.call(module.exports, line);
    });
    callback();
  },
});
