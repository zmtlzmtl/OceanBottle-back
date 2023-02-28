const { Scripts, Users, plusScripts, } = require('../models');
const { Sequelize } = require("sequelize")

class ScriptsRepository{
    //create
    createScript = async({userId, genre, title, content}) =>{
         const createData = await Scripts.create({
            UserId:userId,
            genre, 
            title, 
            content
        });
        return createData;
    }

    //getAll
    getAllRepo = async() => {
        const scripts = await Scripts.findAll({
            attributes: ['scriptId','genre','title','UserId','createdAt', 'updatedAt'],
            include: [
                {
                    model: Users,
                    attributes:['id']
                },                
            ],
            order: [["createdAt", "DESC"]],
        });
        

        return scripts;
    }

    //getDetail
    getDetailRepo = async({ scriptId }) => {
        const script = await Scripts.findOne({
            where: { scriptId },
            include: {
            model: Users,
            attributes:['id']
            },
            });
        const contributor = await plusScripts.findAll({
            where: { scriptId },
            include: {
            model: Users,    
            attributes:['id']    
            },                            
        });
        const result = {script, contributor};
        return result
    }
    //update
    updateRepo = async({ userId, scriptId, genre, title, content }) => {
        const updateScript = await Scripts.findOne({
            where:{scriptId}
        });
        const plusScript = await plusScripts.findAll({
            where:{ script }
        });
        
        if(updateScript.userId !== userId){
            return res.status(400).json({ errorMessage : '해당 게시물을 수정 할 수 있는 권한이 없습니다.'}) ;
        }else if( plusScript ){
            return res.status(401).json({ errorMessage: '연관 된 게시물이 존재하여 해당 게시물을 수정 할 수 없습니다.'})
        }
        
    
        await Scripts.update(
            {genre, title, content},
            {
                where: { scriptId }
            }
        );
        return;
    }

    //delete
    deleteRepo = async({ scriptId }) => {
        const deleteScript = await Scripts.findOne({
            where:{scriptId}
        });
        const plusScript = await plusScripts.findAll({
            where:{ script }
        });
        
        if(deleteScript.userId !== userId){
            return res.status(400).json({ errorMessage : '해당 게시물을 삭제 할 수 있는 권한이 없습니다.'}) ;
        }else if( plusScript ){
            return res.status(401).json({ errorMessage: '연관 된 게시물이 존재하여 해당 게시물을 삭제 할 수 없습니다.'})
        }

        
        await Scripts.destroy({            
            where: { scriptId }
        });
        return;
    }
    //getRandom
    getRandomRepo = async() => {
        const scripts = await Scripts.findAll({ 
            attributes: ["genre", "title", "content"],
            order: Sequelize.literal('rand()'), 
            limit: 5 
        });
    
        return scripts;
    }

    
}

module.exports = ScriptsRepository;