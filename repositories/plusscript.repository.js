const { plusScripts } = require("../models");
const { Scripts } = require("../models");

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

  findPlusScripts = async (scriptId) => {
    const plusScript = await plusScripts.findAll({
      attributes: [
        "plusScriptId",
        "UserId",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      where: { ScriptId: scriptId },
    });
    return plusScript;
  };

  findOnescript = async ({ ScriptId }) => {
    const script = await Scripts.findOne({
      where: { ScriptId },
    });
    return script;
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
  deletePlusscript = async (plusScriptId) => {
    const plusscript = await plusScripts.destroy({
      where: {
        [Op.and]: [{ userId }, { plusScriptId }],
      },
    });

    return plusscript;
  };
}
module.exports = PlusscriptRepository;
