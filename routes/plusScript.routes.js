const express = require("express");
const router = express.Router();

const PlusscriptController = require("../controllers/plusscript.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const plusscriptController = new PlusscriptController();

router.post(
  "/:scriptId",
  authMiddleware,
  plusscriptController.createplusscript
);

router.patch(
  "/:plusScriptId",
  authMiddleware,
  plusscriptController.modifyingPlusscript
);

router.delete(
  "/:plusScriptId",
  authMiddleware,
  plusscriptController.deletePlusscript
);

module.exports = router;
