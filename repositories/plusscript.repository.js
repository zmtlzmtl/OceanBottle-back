const { plusScripts, Scripts, Users } = require("../models");

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

  findonePlusScripts = async ({ plusScriptId }) => {
    const plusScript = await plusScripts.findOne({
      where: {
        plusScriptId,
      },
    });

    return plusScript;
  };

  findOnescript = async ({ myId }) => {
    const scripts = await Users.findAll({
      where: { id: myId },
      include: [
        {
          model: Scripts,
          include: [
            {
              model: plusScripts,
              include: [
                { model: Users, where: { id: myId }, attributes: ["id"] },
              ],
            },
          ],
        },
      ],
    });
    return scripts;
  };

  modifyingPlusscript = async ({ userId, plusScriptId, content }) => {
    const plusscript = await plusScripts.update(
      { content },
      {
        where: {
          [Op.and]: [{ UserId: userId }, { plusScriptId }],
        },
      }
    );

    return plusscript;
  };

  deletePlusscript = async ({ plusScriptId, userId }) => {
    const plusscript = await plusScripts.destroy({
      where: {
        [Op.and]: [{ UserId: userId }, { plusScriptId }],
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
