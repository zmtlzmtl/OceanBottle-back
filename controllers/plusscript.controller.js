const plusscriptService = require("../services/plusscript.service");

class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res) => {
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
  modifyingPlusscript = async (req, res) => {
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
      const plusscript3s = await this.plusscriptService.getting3plusscript({
        page,
      });
      // console.log(plusscript3s);
      return res.send({ plusscript3s });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err: err.message });
    }
  };
}

module.exports = plusscriptController;
