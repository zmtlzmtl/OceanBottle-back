const express = require('express');
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

require('dotenv').config();
const { KEY } = process.env;

const router = express.Router();

router.post('/user', async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await Users.findOne({
      attributes: ['id'],
      where: { id },
    });

    if (user) {
      return res.status(412).send({
        "errorMessage": "중복 된 아이디가 존재합니다.",
      });
    }
    await Users.create({ id, password });
    console.log(`${id} 님이 가입하셨습니다.`);

    return res.status(201).send({ "message": "회원 가입에 성공하였습니다." });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({
      "errorMessage": "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { id, password } = req.body;
      const user = await Users.findOne({
        where: { id },
      });
  
      if (!user || password !== user.password) {
        return res.status(412).send({
          "errorMessage": "닉네임 또는 패스워드를 확인해주세요.",
        });
      }
  
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60); // expires의 시간을 현재 시간의 60분 후로 설정
  
      const token = jwt.sign(
        { userId: user.userId },
        KEY,
        { expiresIn: '1h' },
      );
  
      res.cookie('Authorization', `Bearer ${token}`, {
        expires: expires, // cookie의 만료시간 설정
      });
  
      return res.status(200).json({ token });
    } catch (error) {
      console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).send({
        "errorMessage": "로그인에 실패하였습니다."
      });
    }
  });

  //연습
  router.get('/front', authMiddleware, async (req,res)=> {
      res.status(200).json({isUser: 'true'})
  });


module.exports = router;
