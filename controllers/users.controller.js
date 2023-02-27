const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { KEY } = process.env;

class UsersController {
    constructor() {
        this.usersService = new UsersService();
    }

    postCreateUser = async (req, res) => {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(412).json({ "errorMessage": "입력되지 않은 값이 있습니다." })
        }
        try {
            await this.usersService.postCreateUser({ id, password });

            return res.status(201).json({ "message": "회원 가입에 성공하였습니다." });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ "errorMessage": "" })
        }
    }

    postLoginUser = async (req, res) => {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(412).json({ "errorMessage": "입력되지 않은 값이 있습니다." })
        }
        const user = await this.usersService.postLoginUser({ id, password });

        const token = jwt.sign(
            { userId: user.userId },
            KEY,
        );
        res.cookie("Authorization", `Bearer ${token}`); // JWT를 Cookie로 할당합니다!
        res.status(200).json({ "message": "로그인에 성공하셨습니다." });
    }
}

module.exports = UsersController;