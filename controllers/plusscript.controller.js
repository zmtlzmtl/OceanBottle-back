const plusscriptService = require("../services/plusscript.service");

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
      const plusscript = await this.plusscriptService.modifyingPlusscript({
        plusScriptsId: plusScriptId,
        UserId: userId,
        content,
      });
      return res.send({ patched: plusscript });
    } catch (error) {
      next(error);
      return res.status(400).send({ error: error.message });
    }
  };
  deletePlusscript = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { plusScriptId } = req.params;

      if (!userId || !plusScriptId) {
        return res.status(400).send("invalid userId, plusScriptId");
      }

      const plusscript = await this.plusscriptService.deletePlusscript({
        userId,
        plusScriptId,
      });

      res.json({ plusscript });
    } catch (error) {
      next(error);
      return res.status(400).send({ error: error.message });
    }
  };
}

module.exports = plusscriptController;
