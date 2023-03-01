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

  modifyingPlusscript = async ({ UserId, plusScriptId, content }) => {
    const plusscript = await this.plusscriptRepository.modifyingPlusscript({
      plusScriptId,
      UserId,
      content,
    });
    return plusscript;
  };
  deletePlusscript = async ({ plusScriptId, UserId }) => {
    const plusscript = await this.plusscriptRepository.deletePlusscript({
      plusScriptId,
      UserId,
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
