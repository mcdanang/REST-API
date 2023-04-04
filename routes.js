//Using Express
const express = require("express");
const router = express.Router();
const authorization = require('./middleware/authorization');
const userController = require('./controller/user');

// router.get('/user/list', authorization.authorize, userController.list);
router.get('/user/list', userController.list);

module.exports = router;