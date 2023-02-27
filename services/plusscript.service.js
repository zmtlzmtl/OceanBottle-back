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

  modifyingPlusscript = async (userId, plusScriptId, comment) => {
    // const isExistPlusScript = await this.plusscriptRepository.findOneplusscript(
    //   { plusScriptId }
    // );
    // if (!isExistPlusScript) {
    //   return res.status(400).send("no existing plus script.");
    // }
    const plusscript = await this.plusscriptRepository.modifyingPlusscript({
      plusScriptId,
      userId,
      comment,
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
