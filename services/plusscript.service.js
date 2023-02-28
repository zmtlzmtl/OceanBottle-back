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

  findOnescript = async ({ plusScriptsId }) => {
    const script = await this.plusscriptRepository.findOnescript({
      plusScriptsId,
    });
    return script;
  };

  modifyingPlusscript = async ({ UserId, plusScriptsId, content }) => {
    const plusscript = await this.plusscriptRepository.modifyingPlusscript({
      plusScriptsId,
      UserId,
      content,
    });
    return plusscript;
  };
  deletePlusscript = async ({ plusScriptsId, UserId }) => {
    const plusscript = await this.plusscriptRepository.deletePlusscript({
      plusScriptsId,
      UserId,
    });
    return plusscript;
  };
}

module.exports = plusscriptService;
