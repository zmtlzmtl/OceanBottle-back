const { Scripts, Users, plusScripts, sequelize } = require('../models');
const { Sequelize } = require("sequelize")

class ScriptsRepository {
  //create
  createScript = async ({ userId, genre, title, content, contributors }) => {
    const createData = await Scripts.create({
      UserId: userId,
      genre,
      title,
      content,
      contributors
    });
    return createData;
  };

  //getAll
  getAllRepo = async () => {
    const scripts = await Scripts.findAll({
      raw: true,
      attributes: [
        "scriptId",
        "genre",
        "title",
        "UserId",
        "createdAt",
        "updatedAt",
        "contributors",
        [
          sequelize.fn("COUNT", sequelize.col("plusScripts.ScriptId")),
          "plusCount",
        ],
      ],
      include: [
        {
          model: Users,
          attributes: ["id"],
        },
      ],
      include: [
        {
          model: plusScripts,
          attributes: [],
        },
      ],
      group: ["Scripts.scriptId"],
      order: [["createdAt", "DESC"]],
    });

    return scripts;
  };

  //getDetail
  getDetailRepo = async ({ scriptId }) => {
    const script = await Scripts.findOne({
      where: { scriptId },
      include: {
        model: Users,
        attributes: ["id"],
      },
    });
    const contributor = await plusScripts.findAll({
      where: { scriptId },
      include: {
        model: Users,
        attributes: ["id"],
      },
    });
    const result = { script, contributor };
    return result;
  };
  //update
  updateRepo = async ({ userId, scriptId, genre, title, content }) => {
    const updateScript = await Scripts.findOne({
      where: { scriptId },
    });
    console.log(updateScript.UserId, userId)
    const plusScript = await plusScripts.findAll({
      where: { ScriptId: scriptId },
    });
    console.log(plusScript)

    if (updateScript.UserId !== userId) {
      const e = new Error("해당 게시물을 수정 할 수 있는 권한이 없습니다. 형식이 일치하지 않습니다."); 
      e.name = '400';
      throw e; 
    } 
    if (plusScript.length !== 0 ) {
      const e = new Error("연관 된 게시물이 존재하여 해당 게시물을 수정 할 수 없습니다."); 
      e.name = '400';
      throw e;
    }

    const upScript= await Scripts.update(
      { genre, title, content },
      {
        where: { scriptId },
      }
    );
    return upScript;
  };

  //delete
  deleteRepo = async ({ userId, scriptId }) => {
    const deleteScript = await Scripts.findOne({
      where: { scriptId },
    });
    const plusScript = await plusScripts.findAll({
      where: { ScriptId: scriptId },
    });

    if (deleteScript.UserId !== userId) {
      const e = new Error("해당 게시물을 삭제 할 수 있는 권한이 없습니다."); 
      e.name = '400';
      throw e;
    } 
    if (plusScript.length !== 0) {
      const e = new Error("연관 된 게시물이 존재하여 해당 게시물을 삭제 할 수 없습니다."); 
      e.name = '400';
      throw e;
    }

    await Scripts.destroy({
      where: { scriptId },
    });
    return;
  };
  //getRandom
  getRandomRepo = async () => {
    const scripts = await Scripts.findAll({
      attributes: ["scriptId","genre", "title", "content"],
      include:[
        {
            model: Users,
            attributes: ["id"]
        }
      ],
      order: Sequelize.literal("rand()"),
      limit: 5,
    });

    return scripts;
  };
}

module.exports = ScriptsRepository;