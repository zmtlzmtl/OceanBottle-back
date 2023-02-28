const { plusScripts } = require("../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

class PlusscriptRepository extends plusScripts {
  constructor() {
    super();
  }
  createplusscript = async ({ ScriptId, UserId, content }) => {
    const plusscript = await plusScripts.create({
      ScriptId,
      UserId,
      content,
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

  findOnescript = async ({ plusScriptId }) => {
    const script = await plusScripts.findByPk(plusScriptId);
    return script;
  };

  modifyingPlusscript = async ({ UserId, plusScriptId, content }) => {
    const plusscript = await plusScripts.update(
      { content },
      {
        where: {
          [Op.and]: [{ UserId }, { plusScriptId }],
        },
      }
    );

    return plusscript;
  };

  deletePlusscript = async ({ plusScriptId, UserId }) => {
    const plusscript = await plusScripts.destroy({
      where: {
        [Op.and]: [{ UserId }, { plusScriptId }],
      },
    });

    return plusscript;
  };

  getting3plusscript = async ({ page }) => {
    let plusscript3s = await plusScripts.findAll({
      order: sequelize.col("createdAt"),
      limit: 3,
      offset: page * 3,
    });
    return plusscript3s;
  };
}
module.exports = PlusscriptRepository;
