const plusscriptService = require("../sevices/plusscript.service");

class plusscriptController {
  constructor() {
    this.plusscriptService = new plusscriptService();
  }
  createplusscript = async (req, res, next) => {
    try {
      const { scriptId, content } = req.body;

      if (!scriptId || !content) {
        console.log(err);
        return res.status(400).send({ err: err.message });
      }

      const plusscript = await this.plusscriptService.createplusscript({
        scriptId,
        UserId,
        content,
      });

      res.json({ result: plusscript });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = plusscriptController;
