const plusscriptRepository = require("../repositories/plusscript.repository");

class plusscriptService {
  constructor() {
    this.plusscriptRepository = new plusscriptRepository();
  }
  createplusscript = async ({ scriptId, userId, content }) => {
    const plusscript = await this.plusscriptRepository.createplusscript({
      scriptId,
      userId,
      content,
    });

    return plusscript;
  };
}

module.exports = plusscriptService;
