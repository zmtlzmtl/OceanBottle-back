const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const UsersController = require('../controllers/users.controller');  //[class UsersController]
const usersController = new UsersController();


router.post('/user', usersController.postCreateUser);
router.post('/login', usersController.postLoginUser);
router.get('/myPage', authMiddleware, usersController.myPage);

module.exports = router;