const jwt = require('jsonwebtoken');
const { Users } = require('../models');

require('dotenv').config();
const { KEY } = process.env;

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
module.exports = async (req, res, next) => {
  try {
    const { Authorization } = req.cookies;

    const [authType, authToken] = (Authorization ?? "").split(" ");
  
    // 토큰 존재 확인
    if (authType !== "Bearer" || !authToken) {
      res.status(400).json({
        errorMessage: "로그인 후 사용이 가능합니다.",
      });
      return;
    }

    const { userId } = jwt.verify(authToken, KEY);
    const user = await Users.findByPk(userId);

    res.locals.user = user;
    next();
  } catch (error) {
    res.clearCookie('Authorization'); // 인증에 실패하였을 경우 Cookie를 삭제합니다.
    console.error(error);
    return res.status(403).send({
      errorMessage: '로그인이 필요한 기능입니다.',
    });
  }
};
