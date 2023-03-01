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
    myPlusScript = async ({ userId, id }) => {
        const myPlusScript = await plusScripts.findAll({
            raw: true,
            attributes: [
                "plusScriptId",
                "ScriptId",
                "UserId",
                [
                    sequelize.fn("COUNT", sequelize.col("plusScripts.ScriptId")),
                    "plusCount",
                ],
            ],
            include: [
                {
                    model: Scripts,
                    attributes: ["genre", "title", "contributors"],
                },
            ],
            group: ["plusScripts.ScriptId"],
            order: [["createdAt", "DESC"]],
            where: { UserId: userId }
        }).map((data) => {
            return {
                plusScriptId: data.plusScriptId,
                ScriptId: data.ScriptId,
                title: data.title,
                UserId: data.UserId,
                plusCount: data.plusCount,
                genre: data["Script.genre"],
                title: data["Script.title"],
                contributors: data["contributors.id"],
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        });
    }
}

module.exports = UsersRepository;