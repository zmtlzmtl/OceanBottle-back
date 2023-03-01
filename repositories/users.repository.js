const { Users, Scripts, plusScripts } = require("../models");

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
    myPage = async ({ userId, id }) => {
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
            ],
            where: {userId}
        })
        const myPlusScript = await plusScripts.findAll({
            raw: true,
            attributes: [
                "plusScriptId",
                "scriptId",
                "content",
                "createdAt",
                "updatedAt",
            ],
            where: {userId}
        })
        const page = { id, myScript, myPlusScript }
        return page;
    }
}

module.exports = UsersRepository;