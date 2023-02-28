const express = require("express");
const router = express.Router();

// 예시 4~6번째 줄

// const postsRouter = require("./posts");
// router.use("/posts", [postsRouter]);

const ScriptRouter = require("./scripts.routes");
const UserRouter = require("./users.routes");
const plusscriptRouter = require("./plusScript.routes");

router.use("/scripts", [ScriptRouter]);
router.use("/", [UserRouter]);
router.use("/", [plusscriptRouter]);

module.exports = router;
