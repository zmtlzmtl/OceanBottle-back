const express = require("express");
const router = express.Router();

const PlusscriptController = require("../controllers/plusscript.controller");
const plusscriptController = new PlusscriptController();

router.post("/", plusscriptController.createplusscript);

module.exports = router;
