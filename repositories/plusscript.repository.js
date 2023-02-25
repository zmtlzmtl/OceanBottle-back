const { plusScripts } = require("../models");

class PlusscriptRepository extends plusScripts {
  constructor() {
    super();
  }
  createplusscript = async ({ scriptId, userId, content }) => {
    const plusscript = await plusScripts.createplusscript({
      scriptId,
      userId,
      content,
    });
    return plusscript;
  };
}
module.exports = PlusscriptRepository;
