const api = require('express')();

const routerMovie = require('./movie/router');

api.use('/movie', routerMovie);

module.exports = api;
