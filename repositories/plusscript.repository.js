const { where } = require("sequelize");
const { plusScripts } = require("../models");
const { Op } = require("sequelize");

class PlusscriptRepository extends plusScripts {
  constructor() {
    super();
  }
  createplusscript = async ({
    ScriptId,
    UserId,
    comment,
    plusScriptId,
    createdAt,
    updatedAt,
  }) => {
    const plusscript = await plusScripts.create({
      ScriptId,
      UserId,
      comment,
      plusScriptId,
      createdAt,
      updatedAt,
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
          [Op.and]: [{ UserId: userId }, { plusScriptId }],
        },
      }
    );
    // if (!plusscript) {
    //   return res.status(404).json({ message: "no plus script." });
    // } else if (plusscript.UserId !== userId) {
    //   return res.status(401).json({ message: "invalid token." });
    // }
    return plusscript;
  };
}
module.exports = PlusscriptRepository;
