const routes = require('express').Router();
const baseControl = require('../controllers/baseControl');

routes.get('/', baseControl.getData);

routes.get('/contacts', baseControl.getAll);

routes.get('/:id', baseControl.getSingle);

module.exports = routes;