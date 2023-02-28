const express = require("express");
const plusrouter = express.Router({ mergeParams: true });

const PlusscriptController = require("../controllers/plusscript.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const plusscriptController = new PlusscriptController();

plusrouter.post("/", authMiddleware, plusscriptController.createplusscript);

plusrouter.patch(
  "/:plusScriptId",
  authMiddleware,
  plusscriptController.modifyingPlusscript
);

plusrouter.delete(
  "/:plusScriptId",
  authMiddleware,
  plusscriptController.deletePlusscript
);

plusrouter.get("/:plusScriptId", plusscriptController.findOnescript);

plusrouter.get("/", plusscriptController.getting3plusscript);

module.exports = plusrouter;
