const plusscriptService = require("../services/plusscript.service");

class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res, next) => {
    try {
      const { scriptId, content } = req.body;

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
}

module.exports = plusscriptController;
