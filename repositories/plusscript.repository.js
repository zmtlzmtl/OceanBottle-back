const { plusScripts } = require("../models");

class plusscriptRepository extends plusScripts {
  constructor() {
    super();
  }
  createplusscript = async ({ scriptId, userId, content }) => {
    const plusscript = await this.plusscriptRepository.createplusscript({
      scriptId,
      userId,
      content,
    });
    return plusscripts;
  };
}
module.exports = plusscriptRepository;
