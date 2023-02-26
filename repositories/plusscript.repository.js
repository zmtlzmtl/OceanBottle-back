const { plusScripts } = require("../models");
const { Op } = require("sequelize");

class PlusscriptRepository extends plusScripts {
  constructor() {
    super();
  }
  createplusscript = async ({ ScriptId, UserId, comment }) => {
    const plusscript = await plusScripts.create({
      ScriptId,
      UserId,
      comment,
    });
    return plusscript;
  };

  findOneplusscript = async ({ plusScriptId }) => {
    const plusscript = await plusScripts.findOne({
      where: { plusScriptId },
    });
    return plusscript;
  };

  modifyingPlusscript = async (userId, plusScriptId, comment) => {
    const plusscript = await plusScripts.update(
      { comment },
      {
        where: {
          [Op.and]: [{ userId }, { plusScriptId }],
        },
      }
    );

    return plusscript;
  };
}
module.exports = PlusscriptRepository;
