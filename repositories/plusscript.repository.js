const { plusScripts } = require("../models");

class PlusscriptRepository extends plusScripts {
  constructor() {
    super();
  }
  createplusscript = async ({ scriptId, userId, content }) => {
    const plusscript = await plusScripts.create({
      scriptId,
      userId,
      content,
    });
    return plusscript;
  };

  findPlusScripts = async ( scriptId ) => {
    const plusScript = await plusScripts.findAll({ 
      attributes:['plusScriptId', 'UserId','comment','createdAt', 'updatedAt'],
      where: { ScriptId : scriptId }
    });
      return plusScript;
  }
     
}
module.exports = PlusscriptRepository;
