const { Scripts } = require('../models');

class ScriptsRepository{
    //Script 생성
    createScript = async({userId, genre, title, content}) =>{
        const createData = await Scripts.create({
            UserId:userId,
            genre, 
            title, 
            content
        });
        return createData;
    }
    //Script 상세 조 회
    findOneScript = async(scriptId) => {
        const findScript =  await Scripts.findOne({
            where: {scriptId}
        });
        
    return findScript;
    }

    //Script 랜덤 5개 가져오기
    findRandomscript = async() => {
        const randomScripts = await Scripts.findAll({
            attributes: ['scriptId', 'genre', 'title', 'content']
        });
        return randomScripts;
    }

    //Script 전체 조회
    findAllScript = async() => {
        const findAllScript = await Scripts.findAll({
            attributes: ['scriptId', 'genre', 'title','id']
        });
        // const findAllplusId = await plusScripts.findAll({
        //     attributes: ['id'],
        //     where: { ScriptId }
        // });
        return findAllScript;
    }
}

module.exports = ScriptsRepository;