const router = require('express').Router();

const MovieController = require('./Controller');

router.get('/', MovieController.getMovie);

module.exports = router;
