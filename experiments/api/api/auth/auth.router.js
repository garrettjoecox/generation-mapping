
const express = require('express');
const controller = require('./auth.controller');
const router = express.Router();

router.post( '/signup',        controller.signup);
router.post( '/login',         controller.login);
router.get(  '/authenticated', controller.authenticated);

module.exports = router;
