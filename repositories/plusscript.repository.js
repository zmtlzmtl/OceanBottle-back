const { plusScripts } = require("../models");

const { Op } = require("sequelize");

class PlusscriptRepository extends plusScripts {
  constructor() {
    super();
  }
  createplusscript = async ({ ScriptId, UserId, content, plusScriptId }) => {
    const plusscript = await plusScripts.create({
      ScriptId,
      UserId,
      content,
      plusScriptId,
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

  findOnescript = async ({ plusScriptsId }) => {
    const script = await plusScripts.findByPk(plusScriptsId);
    return script;
  };

  modifyingPlusscript = async ({ UserId, plusScriptsId, content }) => {
    const plusscript = await plusScripts.update(
      { content },
      {
        where: {
          [Op.and]: [{ UserId }, { plusScriptsId }],
        },
      }
    );

    return plusscript;
  };

  deletePlusscript = async ({ plusScriptsId, UserId }) => {
    const plusscript = await plusScripts.destroy({
      where: {
        [Op.and]: [{ UserId }, { plusScriptsId }],
      },
    });

    return plusscript;
  };
}
module.exports = PlusscriptRepository;
