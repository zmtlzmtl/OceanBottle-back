const plusscriptService = require("../services/plusscript.service");
const Joi = require("joi");
const { Users } = require("../models");
class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res) => {
    try {
      const { content } = req.body;
      const { scriptId } = req.params;
      const { userId } = res.locals.user;
      const contentschema = Joi.object({
        content: Joi.string().required().max(content.length),
      });
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

      await this.plusscriptService.modifyingPlusscript({
        plusScriptId,
        userId,
        content,
      });
      const updatedResult = await this.plusscriptService.findonePlusScripts({
        plusScriptId,
      });
      return res.json({ updatedResult });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  deletePlusscript = async (req, res, next) => {
    try {
      const { plusScriptId } = req.params;
      const { userId } = res.locals.user;
      const willdeleted = await this.plusscriptService.findonePlusScripts({
        plusScriptId,
      });
      // console.log(userId);
      if (!plusScriptId)
        return res.status(400).json({ msg: "plus script id is required." });
      if (willdeleted == null)
        return res.status(400).json({ msg: "theres no to be deleted." });

      await this.plusscriptService.deletePlusscript({
        userId,
        plusScriptId,
      });
      return res.status(200).json({ willdeleted });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  findOnescript = async (req, res) => {
    try {
      const { myId } = req.query;
      const { userId } = res.locals.user;
      const myscript = await this.plusscriptService.findOnescript({
        userId,
        myId,
      });
      if (!myId) return res.status(400).json({ msg: "myId is required." });
      if (myscript == "")
        return res.status(400).json({ msg: "no existing myId." });
      return res.status(200).json({ myscript });
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

      return res.json({ plusscript3s });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  };
}

module.exports = plusscriptController;
