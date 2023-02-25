const express = require("express");
const { Scripts } = require("../models")
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//첫 게시글 생성
router.post('/scripts', authMiddleware, async (req, res) => {
    const { userId } = res.locals.user; 
    const { gerne, title, content } = req.body;
  
    await Scripts.create({
      UserId: userId,
      gerne,
      title,
      content,
    });
    return res.status(200).json();
});    
 
// 5개 script 랜덤으로 보내기 !!확인필요
router.get('/scripts', async(req, res) => {
    //findAll에서 scriptId 기준 랜덤으로 5개의 무작위 Id 의 데이터를 가져올 수 없는지 체크
    const randomScript = await Scripts.findAll({
        attributes: ['scriptId', 'title', 'content', 'gerne'], 
        where: {scriptId}        
    });
    return res.status(200).json({ script : randomScript })
});

// 첫 게시물 상세조회 (main button click)
router.get('/scripts/scriptId', async(req, res) => {
    const {scriptId} = req.params;

    const detailScript = await Scripts.findOne({
        attributes: ['scriptId', 'title', 'content', 'createdAt', 'updatedAt'], //조회 할 컬럼을 먼저 설정
        where: { scriptId },
      });
    res.status(200).json({ script: detailScript})
});
   

//첫 게시글 수정
router.put('/scripts/:scriptId', authMiddleware, async (req, res) => {
  const { scriptId } = req.params;
  const { userId } = res.locals.user;
  const { title, content } = req.body;

  const script = await Scripts.findOne({ where: { scriptId } });

    if (script.UserId !== userId) {
    return res
      .status(400)
      .json({ message: '게시글을 수정할 권한이 없습니다.' });
  }
  await Scripts.update(
    { title, content },
    {
      where: { scriptId }, 
    },
  );
  return res.status(200).json();
});

//첫 게시글 삭제
router.put('/scripts/:scriptId', authMiddleware, async (req, res) => {
    const { scriptId } = req.params;
    const { userId } = res.locals.user;
    await Scripts.findOne({ where: { scriptId } });
  
    await Scripts.destroy(
    {
      where: { scriptId }, 
    },
    );
    return res.status(200).json();
  });



module.exports = router;