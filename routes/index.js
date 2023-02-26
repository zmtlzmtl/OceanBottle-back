const express = require("express");
const router = express.Router();

// 예시 4~6번째 줄
const UserRouter = require("./users");
const plusscriptRouter = require("./plusScript.routes");

router.use("/", [UserRouter]);
router.use("/plusscript", [plusscriptRouter]);

module.exports = router;
