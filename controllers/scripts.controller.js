const ScriptsService = require('../services/scripts.service');

class ScriptsController{
    scriptsService = new ScriptsService();

    //create
    createScript = async( req, res, next) => {
        const { userId } = res.locals.user;
        const { genre, title, content } = req.body;
        if(!userId){
            return{message : "로그인 후 이용 가능합니다."}
        }
        try{
            await this.scriptsService.createScript({
                userId,
                genre, 
                title, 
                content
        });
            res.status(201).json({message: "게시글 등록이 완료되었습니다."})
    }catch(err){
        next(err);
    }
};

    //getAll
    getAllController = async(req, res, next) => {
        const scripts = await this.scriptsService.getAllService();

        res.status(200).json({ scripts });
    }

    //getDetail
    getDetailController = async(req, res, next) => {
        const { scriptId } = req.params;
        try{
            const script = await this.scriptsService.getDetailService({ scriptId });
            res.status(200).json({ script });
        }catch(err){
            next(err);
        };        
    }

    //update
    updateController = async(req, res, next) => {
        const { userId } = res.locals.user;
        const { scriptId } = req.params;
        const { genre, title, content } = req.body;
        if(!userId){
            return{message : "로그인 후 이용 가능합니다."}
        }else if(!genre || !title || !content){
            return {messge : "게시물에 빈 칸이 존재할 수 없습니다."}
        }
        const updateScript = await this.scriptsService.updateService( { userId, scriptId, genre, title, content } );
        if(updateScript.length !== 1){
            return res.status(401).json({ errorMessage : "연관 된 PlusScript 가 생성되어 있어 삭제 할 수 없습니다."})
        }
        res.status(200).json({message : "게시물 수정이 완료되었습니다."})
    }

    //delete
    deleteController = async(req, res, next)=> {
        const { userId } = res.locals.user;
        const { scriptId } = req.params;
        if(!userId){
            return{message : "로그인 후 이용 가능합니다."}
        }
        await this.scriptsService.deleteService({ userId, scriptId });

        res.status(200).json({ message : "게시물 삭제가 완료 되었습니다."})
    }

    //getRandom
    getRandomController = async(req, res, next) => {
        const randomScripts = await this.scriptsService.getRandomService();

        res.status(200).json({ randomScripts });
    }

   
};

module.exports = ScriptsController;