const express = require('express');
const router = express.Router();

const ScriptsController = require('../controllers/scripts.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const scriptsController = new ScriptsController();

//first script 생성하기
router.post('/',authMiddleware, scriptsController.createScript);
//script 상세보여주기
router.get('/:scripId/', scriptsController.findOneScript);
//script 랜덤 5개 보여주기
router.get('/', scriptsController.findRandomScript);
//script 전체 조회
router.get('/all/',scriptsController.findAllScript);

module.exports = router;