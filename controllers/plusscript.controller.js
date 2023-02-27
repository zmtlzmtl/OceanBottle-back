const plusscriptService = require("../services/plusscript.service");

class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { scriptId } = req.params;

      if (!scriptId || !content) {
        return res.status(400).send("invalid scriptId or content");
      }

      const plusscript = await this.plusscriptService.createplusscript({
        scriptId,
        content,
      });

      res.json({ result: plusscript });
    } catch (error) {
      next(error);
      return res.status(400).send({ error: error.message });
    }
  };
  modifyingPlusscript = async (req, res, next) => {
    try {
      const { comment } = req.body;
      const { ScriptId } = req.params;
      const { userId } = res.locals.user;
      if (!ScriptId || !comment) {
        return res.status(400).send("require scriptId and comment");
      } else if (!userId) {
        return res.status(400).send("invalid cookie");
      }
      const plusscript = await this.plusscriptService.modifyingPlusscript({
        ScriptId,
        content,
        userId,
      });
      return res.send({ plusscript });
    } catch (error) {
      next(error);
      return res.status(400).send({ error: error.message });
    }
  };
}

module.exports = plusscriptController;
