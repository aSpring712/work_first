var express = require('express');
var router = express.Router();
const userController = require('../controller/user');

router.post('/join', userController.join)
module.exports = router;