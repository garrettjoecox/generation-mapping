
const express = require('express');
const controller = require('./church.controller');
const router = express.Router();

router.post(   '/',    controller.create);
router.get(    '/',    controller.retrieveAll);
router.get(    '/:id', controller.retrieve);
router.put(    '/:id', controller.update);
router.delete( '/:id', controller.destroy);

module.exports = router;