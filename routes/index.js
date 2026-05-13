const routes = require('express').Router();
const baseControl = require('../controllers/baseControl');

routes.get('/', baseControl.getData);

routes.get('/contacts', baseControl.getAll);

routes.get('/contacts/:id', baseControl.getSingle);

routes.post('/contacts', baseControl.createContact);

routes.put('/contacts/:id', baseControl.updateContact);

routes.delete('/contacts/:id', baseControl.deleteContact);

module.exports = routes;