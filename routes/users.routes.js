const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');  //[class UsersController]
const usersController = new UsersController();


router.post('/user', usersController.postCreateUser);
router.post('/login', usersController.postLoginUser);

module.exports = router;