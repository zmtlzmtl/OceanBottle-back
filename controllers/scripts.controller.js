const ScriptsService = require('../services/scripts.service');

class ScriptsController{
    scriptsService = new ScriptsService();

    //create
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

    //getAll
    getAllController = async(req, res, next) => {
        const scripts = await this.scriptsService.getAllService();

        res.status(200).json({ scripts });
    }

    //getDetail
    getDetailController = async(req, res, next) => {
        const { scriptId } = req.params;
        const scripts = await this.scriptsService.getDetailService({ scriptId });

        res.status(200).json({ scripts });
    }

    //update
    updateController = async(req, res, next) => {
        const { scriptId } = req.params;
        const { genre, title, content } = req.body;
        await this.scriptsService.updateService( { scriptId, genre, title, content } );

        res.status(200).json({message : "게시물 수정이 완료되었습니다."})
    }

    //delete
    deleteController = async(req, res, next)=> {
        const { scriptId } = req.params;
        console.log(scriptId);
        await this.scriptsService.deleteService({ scriptId });

        res.status(200).json({ message : "게시물 삭제가 완료 되었습니다."})
    }

    //getRandom
    getRandomController = async(req, res, next) => {
        const randomScripts = await this.scriptsService.getRandomService();

        res.status(200).json({ randomScripts });
    }

   
};

module.exports = ScriptsController;