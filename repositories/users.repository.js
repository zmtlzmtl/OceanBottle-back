const { Users } = require("../models");

class UsersRepository {
    constructor() {}

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
}

module.exports= UsersRepository;