const plusscriptRepository = require("../repositories/plusscript.repository");

class plusscriptService {
  constructor() {
    this.plusscriptRepository = new plusscriptRepository();
  }
  createplusscript = async ({ ScriptId, UserId, content, plusScriptId }) => {
    const plusscript = await this.plusscriptRepository.createplusscript({
      ScriptId,
      UserId,
      content,
      plusScriptId,
    });
    return plusscript;
  };

  modifyingPlusscript = async ({ UserId, plusScriptsId, content }) => {
    const plusscript = await this.plusscriptRepository.modifyingPlusscript({
      plusScriptsId,
      UserId,
      content,
    });
    return plusscript;
  };
  deletePlusscript = async ({ plusScriptId, userId }) => {
    const plusscript = await this.plusscriptRepository.deletePlusscript({
      plusScriptId,
      userId,
    });
    return plusscript;
  };
}

module.exports = plusscriptService;
