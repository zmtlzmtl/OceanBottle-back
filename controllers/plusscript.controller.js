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
        return res.status(400).send(tempresult.error.details[0].message);
      }

      if (!content) {
        return res.status(400).send("content is required.");
      }
      if (!scriptId) {
        return res.status(400).send("scriptId is required.");
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
  modifyingPlusscript = async (req, res) => {
    try {
      const { content } = req.body;
      const { plusScriptId } = req.params;
      const { userId } = res.locals.user;
      if (!content) {
        return res.status(400).send("plus script is required.");
      }
      const existPlusScript = await this.plusscriptService.findOnescript({
        plusScriptId,
      });

      if (existPlusScript == null)
        return res.status(400).send("theres no existing plus script.");

      if (existPlusScript.content == content) {
        return res.status(400).send("content need to be changed.");
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
      return res.status(400).send({ error: error.message });
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
        return res.status(400).send("plus script id is required.");
      if (willdeleted == null)
        return res.status(400).send("theres no to be deleted.");

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
        return res.status(400).send("plus script input required.");
      if (plusscript == null)
        return res.status(400).send("there is no plus script");
      return res.status(200).send({ plusscript });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err: err.message });
    }
  };
  getting3plusscript = async (req, res) => {
    try {
      let { page } = req.query;
      page = parseInt(page);
      // console.log(page); => 1
      if (!page) {
        return res.status(400).send("page input required.");
      }
      const plusscript3s = await this.plusscriptService.getting3plusscript({
        page,
      });
      if (plusscript3s == "")
        return res.status(400).send("no more plus script");
      console.log(plusscript3s);
      return res.send({ plusscript3s });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err: err.message });
    }
  };
}

module.exports = plusscriptController;
