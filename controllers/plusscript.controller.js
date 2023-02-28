const plusscriptService = require("../services/plusscript.service");
const Joi = require("joi");
class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res) => {
    try {
      const contentschema = Joi.object({
        content: Joi.string().required(),
      });

      const { content } = req.body;
      const { scriptId } = req.params;
      const { userId } = res.locals.user;

      let tempresult = contentschema.validate(req.body);
      if (tempresult.error) {
        return res.status(400).json(tempresult.error.details[0].message);
      }

      if (!scriptId) {
        return res.status(400).json({ msg: "scriptId is required." });
      }
      const plusscript = await this.plusscriptService.createplusscript({
        ScriptId: scriptId,
        UserId: userId,
        content,
      });

      res.json({ plusscript });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  modifyingPlusscript = async (req, res) => {
    try {
      const { content } = req.body;
      const { plusScriptId } = req.params;
      const { userId } = res.locals.user;
      if (!content) {
        return res.status(400).json({ msg: "plus script is required." });
      }
      const existPlusScript = await this.plusscriptService.findOnescript({
        plusScriptId,
      });

      if (existPlusScript == null)
        return res.status(400).json({ msg: "theres no existing plus script." });

      if (existPlusScript.content == content) {
        return res.status(400).json({ msg: "content need to be changed." });
      }

      await this.plusscriptService.modifyingPlusscript({
        plusScriptId,
        UserId: userId,
        content,
      });

      const updatedResult = await this.plusscriptService.findOnescript({
        plusScriptId,
      });
      return res.json({ updatedResult });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  deletePlusscript = async (req, res) => {
    try {
      const { plusScriptId } = req.params;
      const { userId } = res.locals.user;
      const willdeleted = await this.plusscriptService.findOnescript({
        plusScriptId,
        UserId: userId,
      });
      if (!plusScriptId)
        return res.status(400).json({ msg: "plus script id is required." });
      if (willdeleted == null)
        return res.status(400).send({ msg: "theres no to be deleted." });

      res.json({ deleted: willdeleted });
      await this.plusscriptService.deletePlusscript({
        UserId: userId,
        plusScriptId,
      });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  };
  findOnescript = async (req, res) => {
    try {
      const { plusScriptId } = req.params;
      const plusscript = await this.plusscriptService.findOnescript({
        plusScriptId,
      });
      if (!plusScriptId)
        return res.status(400).json({ msg: "plus script input required." });
      if (plusscript == null)
        return res.status(400).json({ msg: "there is no plus script" });
      return res.status(200).json({ plusscript });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };
  getting3plusscript = async (req, res) => {
    try {
      let { page } = req.query;
      page = parseInt(page);
      if (!page) {
        return res.status(400).json({ msg: "page input required." });
      }
      const plusscript3s = await this.plusscriptService.getting3plusscript({
        page,
      });
      if (plusscript3s == "")
        return res.status(400).json({ msg: "no more plus script" });
      console.log(plusscript3s);
      return res.json({ plusscript3s });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };
}

module.exports = plusscriptController;
