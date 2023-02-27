const ScriptsService = require('../services/scripts.service');

class ScriptsController{
    scriptsService = new ScriptsService();

    //Script 생성
    createScript = async( req, res, next) => {
        const { userId } = res.locals.user;
        const { genre, title, content } = req.body;
        try{
            await this.scriptsService.createScript({
                userId, //id 추가 필요
                genre, 
                title, 
                content
        });
            res.status(201).json({message: "게시글 등록이 완료되었습니다."})
    }catch(err){
        console.log(err);
        next(err);
    }
};

    //Script 상세 조회
    findOneScript = async( req, res, next) => {
        const { scriptId } = req.params;
        try {
            const script = await this.scriptsService.findOneScript(scriptId);
            
            res.status(200).json({ script: script })
        }catch(err){
            next(err);
        }
    }

    // Script 랜덤 5개 가져오기
    findRandomScript = async(req, res, next) => {
        try {
            const findRandomScript = await this.scriptsService.findRandomScript();
            res.status(200).json({ script : findRandomScript});
        }catch(err){
            next(err);
        }
        
    }
    
    //Script 전체 조회 contributor , status 상의 후 추가
    findAllScript = async(req, res, next) => {
        try{
            const findAllScript = await this.scriptsService.findAllScript();
            res.status(200).json({ script : findAllScript });
        }catch(err){
            next(err);
        }
    };

    
};

module.exports = ScriptsController;