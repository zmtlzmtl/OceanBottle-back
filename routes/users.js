const express = require('express');
const { Users } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, async (error, req, res, next) => {
  try {
    //닉네임의 시작과 끝이 a-zA-Z0-9글자로 3 ~ 10 단어로 구성되어야 한다.
    const { id, password, confirm } = req.body;

    if (password !== confirm) {
      return res.status(412).send({
        errorMessage: '패스워드가 일치하지 않습니다.',
      });
    }
    const user = await Users.findAll({
      attributes: ['userId'],
      where: { nickname },
    });

    if (user.length) {
      return res.status(412).send({
        errorMessage: '중복된 닉네임입니다.',
      });
    }
    await Users.create({ nickname, password });
    console.log(`${nickname} 님이 가입하셨습니다.`);

    return res.status(201).send({ message: '회원 가입에 성공하였습니다.' });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({
      errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
    });
  }
});

module.exports = router;
