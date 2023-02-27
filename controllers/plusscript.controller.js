const plusscriptService = require("../services/plusscript.service");
const { plusScripts } = require("../models");

class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res, next) => {
    try {
      const { content, plusScriptId } = req.body;
      const { scriptId } = req.params;
      const { userId } = res.locals.user;

      if (!content) {
        return res.status(400).send("invalid content");
      }
      if (!scriptId) {
        return res.status(404).json({ message: "Script is not exist." });
      }
      const plusscript = await this.plusscriptService.createplusscript({
        ScriptId: scriptId,
        UserId: userId,
        content,
        plusScriptId,
      });

      res.json({ plusscript });
    } catch (error) {
      next(error);
      console.log(error);
      return res.status(400).send({ error: error.message });
    }
  };
  modifyingPlusscript = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { plusScriptId } = req.params;
      const { userId } = res.locals.user;
      if (!content) {
        return res.status(400).send("require content");
      }
      // return res.status(400).send("content did not changed.");
      const existPlusScript = await this.plusscriptService.findOnescript({
        plusScriptsId: plusScriptId,
      });
      if (existPlusScript.content == content) {
        return res.status(400).send("content need to be changed.");
      }

      const plusscript = await this.plusscriptService.modifyingPlusscript({
        plusScriptsId: plusScriptId,
        UserId: userId,
        content,
      });

      return res.json({ patched: plusscript });
    } catch (error) {
      next(error);
      return res.status(400).send({ error: error.message });
    }
  };
  deletePlusscript = async (req, res, next) => {
    try {
      const { plusScriptId } = req.params;
      const { userId } = res.locals.user;
      // if (!userId || !plusScriptId) {
      //   return res.status(400).send("invalid userId, plusScriptId");
      // }
      const plusscript = await this.plusscriptService.deletePlusscript({
        UserId: userId,
        plusScriptsId: plusScriptId,
      });
      res.json({ deleted: plusscript });
    } catch (error) {
      next(error);
      return res.status(400).send({ error: error.message });
    }
  };
  findOnescript = async (req, res, next) => {
    try {
      const { plusScriptId } = req.params;
      const plusscript = await this.plusscriptService.findOnescript({
        plusScriptsId: plusScriptId,
      });
      return res.status(200).send({ plusscript });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err: err.message });
    }
  };
}

module.exports = plusscriptController;
