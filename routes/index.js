const express = require('express');
const router = express.Router();

// 예시 4~6번째 줄
const UserRouter = require("./users.routes");

router.use("/", [UserRouter]);

module.exports = router;