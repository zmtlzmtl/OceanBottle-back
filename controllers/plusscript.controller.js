const plusscriptService = require("../services/plusscript.service");
const Joi = require("joi");
const authSchema = Joi.object({
  content: Joi.string().required(),
});

class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { scriptId } = req.params;
      const { userId } = res.locals.user;
      if (!content) {
        return res.status(400).send("content is required.");
      }
      const plusscript = await this.plusscriptService.createplusscript({
        ScriptId: scriptId,
        UserId: userId,
        content,
      });

      res.json({ plusscript });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  };
  modifyingPlusscript = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { plusScriptId } = req.params;
      const { userId } = res.locals.user;
      if (!content) {
        return res.status(400).send("content is required.");
      }
      const existPlusScript = await this.plusscriptService.findOnescript({
        plusScriptId,
      });
      if (existPlusScript.content == content) {
        return res.status(400).send("content need to be changed.");
      }
      if (content) {
        await this.plusscriptService.modifyingPlusscript({
          plusScriptId,
          UserId: userId,
          content,
        });
      }
      const findquery2 = await this.plusscriptService.findOnescript({
        plusScriptId,
      });
      return res.json({ findquery2 });
    } catch (error) {
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
        plusScriptId,
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
        plusScriptId,
      });
      return res.status(200).send({ plusscript });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err: err.message });
    }
  };
}

module.exports = plusscriptController;
