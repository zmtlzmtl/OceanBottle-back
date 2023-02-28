const express = require('express');
const router = express.Router();

const ScriptsController = require('../controllers/scripts.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const scriptsController = new ScriptsController();

//first script 생성하기
router.post('/',authMiddleware, scriptsController.createScript);
//script 전체 조회
router.get('/all',scriptsController.getAllController);
//script 상세 조회
router.get('/:scriptId/', scriptsController.getDetailController);
//script 수정
router.patch('/:scriptId/', authMiddleware, scriptsController.updateController);
//script 삭제
router.delete('/:scriptId/', authMiddleware, scriptsController.deleteController);
//script 랜덤 5개 보여주기
router.get('/', scriptsController.getRandomController);


module.exports = router;