const plusscriptRepository = require("../repositories/plusscript.repository");

class plusscriptService {
  constructor() {
    this.plusscriptRepository = new plusscriptRepository();
  }
  createplusscript = async ({ ScriptId, UserId, content }) => {
    const plusscript = await this.plusscriptRepository.createplusscript({
      ScriptId,
      UserId,
      content,
    });
    return plusscript;
  };

  findOnescript = async ({ userId, myId }) => {
    const script = await this.plusscriptRepository.findOnescript({
      userId,
      myId,
    });
    return script;
  };

  findonePlusScripts = async ({ plusScriptId }) => {
    const plusScript = await this.plusscriptRepository.findonePlusScripts({
      plusScriptId,
    });
    return plusScript;
  };

  modifyingPlusscript = async ({ userId, plusScriptId, content }) => {
    const plusscript = await this.plusscriptRepository.modifyingPlusscript({
      plusScriptId,
      userId,
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
  getting3plusscript = async ({ page }) => {
    const plusscript3s = await this.plusscriptRepository.getting3plusscript({
      page,
    });
    return plusscript3s;
  };
}

module.exports = plusscriptService;
