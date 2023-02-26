const { Scripts, plusScripts } = require('../models');

class ScriptsRepository{
    //Script 생성
    createScript = async(userId, genre, title, content) =>{
        await Scripts.create({
            Userid:userId,
            genre, title, content
        });

        return;
    }
    //Script 상세 조회
    findOneScript = async(scriptId) => {
        const findScript =  await Scripts.findOne({
            where: {scriptId}
        });
        const findPlus = await plusScripts.findAll({
            where: {scriptId}
        });
    return [findScript,findPlus];
    }

    //Script 랜덤 5개 가져오기
    findRandomScript = async() => {
        const randomScripts = await Scripts.findAll({
            attributes: ['genre', 'title', 'content']
        });
        return randomScripts;
    }

    //Script 전체 조회
    findAllScript = async() => {
        const findAllScript = await Scripts.findAll({
            attributes: [ 'title','genre','id']
        });
        // const findAllplusId = await plusScripts.findAll({
        //     attributes: ['id'],
        //     where: { ScriptId }
        // });
        
    }
}

module.exports = ScriptsRepository;