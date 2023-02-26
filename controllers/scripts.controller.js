const ScriptsService = require('../services/scripts.service');

class ScriptsController{
    scriptsService = new ScriptsService();

    //Script 생성
    createScript = async( req, res, next) => {
        const {userId } = res.locals.user;
        const {genre, title, content } =req.body;
        
        await this.scriptsService.createScript(userId, genre, title, content);

        res.status(200).json({message: "게시글 등록이 완료되었습니다."})
    }

    //Script 상세 조회
    getScript = async( req, res, next) => {
        const Script = await this.scriptsService.findOneScript();
        
        res.status(200).json({ script: Script})
    }

    // Script 랜덤 5개 가져오기
    getRandomScript =  async(req, res, next) => {
        const findRandomScript = await this.scriptsService.findRandomScript();

       res.status(200).json({ randomScript : findRandomScript});
    }

    

    

    
};