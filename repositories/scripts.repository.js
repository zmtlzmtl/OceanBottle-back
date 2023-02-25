const { Scripts, plusScripts } = require('../models');

class ScriptsRepository{
    //Script 등록
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
    return findScript,findPlus;
    }
}

module.exports = ScriptsRepository;