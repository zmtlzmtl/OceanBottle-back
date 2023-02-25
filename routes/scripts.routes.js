const express = require('express');
const router = express.Router();

const ScriptsController = require('../controllers/scripts.controller');
const scriptsController = new ScriptsController();

//script 랜덤 5개 보여주기
router.get('/', scriptsController.getRandomScript);
//script 상세보여주기
router.get('/:scripId/', scriptsController.getScript);
//first script 생성하기
router.post('/', scriptsController.createScript);

module.exports = router;