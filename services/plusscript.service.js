const plusscriptRepository = require("../repositories/plusscript.repository");
const { plusScripts } = require("../models");

class plusscriptService {
  constructor() {
    this.plusscriptRepository = new plusscriptRepository();
  }
  createplusscript = async (ScriptId, UserId, comment) => {
    const isExistScript = await this.plusscriptRepository.findOnescript({
      ScriptId,
    });
    if (!isExistScript) {
      return res.status(404).json({ message: "never existing plus script." });
    }
    const plusscript = await this.plusscriptRepository.createplusscript({
      ScriptId,
      UserId,
      comment,
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
}

module.exports = plusscriptService;
