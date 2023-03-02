const { Users, Scripts, plusScripts, sequelize } = require("../models");

class UsersRepository {
    constructor() { }

    postCreateUser = async ({ id, password }) => {
        const user = await Users.create({
            id,
            password
        })
        return user;
    }

    LoginUser = async ({ id }) => {
        const user = await Users.findOne({
            where: {
                id
            }
        });
        return user;
    };
    myScript = async ({ userId, id }) => {
        const myScript = await Scripts.findAll({
            raw: true,
            attributes: [
                "scriptId",
                "genre",
                "title",
                "UserId",
                "contributors",
                "createdAt",
                "updatedAt",
                [
                    sequelize.fn("COUNT", sequelize.col("plusScripts.ScriptId")),
                    "plusCount",
                ],
            ],
            include: [
                {
                    model: plusScripts,
                    attributes: [],
                },
            ],
            group: ["Scripts.scriptId"],
            order: [["createdAt", "DESC"]],
            where: { UserId: userId }
        })

        return myScript;
    }
    findPlusScript = async ({ userId, id }) => {
        const plusScriptWirte = await plusScripts.findAll({
            raw: true,
            attributes: [ "ScriptId" ],
            where: {UserId: userId}
        })
        return plusScriptWirte;
    }
    myPlusScript = async ({ scriptId }) => {
        const myScript = await Scripts.findOne({
            raw: true,
            attributes: [
                "scriptId",
                "genre",
                "title",
                "UserId",
                "contributors",
                "createdAt",
                "updatedAt",
                [
                    sequelize.fn("COUNT", sequelize.col("plusScripts.ScriptId")),
                    "plusCount",
                ],
            ],
            include: [
                {
                    model: plusScripts,
                    attributes: [],
                },
            ],
            group: ["Scripts.scriptId"],
            order: [["createdAt", "DESC"]],
            where: { scriptId: scriptId }
        })

        return myScript;
    }
}

module.exports = UsersRepository;