/* eslint-disable */
import 'core-js/stable';
import express from 'express';

const server            = express();
const staticMiddleWare  = express.static('dist');
const webpack           = require('webpack');
const config            = require('../../config/webpack.dev');
const compiler          = webpack(config);

const wpkDevMiddleWare  = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

const wpkHotMiddleWare  = require('webpack-hot-middleware')(compiler);

server.use(wpkDevMiddleWare);
server.use(wpkHotMiddleWare);
server.use(staticMiddleWare);

const port              = 8090; // <= CHANGE THIS VALUE TO CHANGE THE PORT.
server.listen(port, () => {
  console.log(`\n\nServer is listening.\nVisit http://localhost:${port}\n\n`);
});
