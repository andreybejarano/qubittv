const express = require('express');
const path = require('path');

const config = require('./config');

const fs = require('fs');
const babelrc = fs.readFileSync('./.babelrc');
let babelConfig;

try {
  babelConfig = JSON.parse(babelrc);
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-polyfill');
require('babel-register')(babelConfig);
require('babel-core').transform('code', babelConfig);

const Ssr = require('./middlewares/ssr');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.use('/api', require('./api'));

app.get('*', Ssr.render);

app.listen(config.port, () => {
  console.log(`Listening on: http://localhost:9090 env: ${config.env}`);
});
