const { Scripts, Users, plusScripts, } = require('../models');

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
        const scripts = await Scripts.findAll()

        return scripts;
    }

    //getDetail
    getDetailRepo = async({ scriptId }) => {
        const script = await Scripts.findOne({
            where: { scriptId }
        });
        return script;
    }
    //update
    updateRepo = async({ scriptId, genre, title, content }) => {
        console.log(genre, title, content)
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
        await Scripts.destroy({            
            where: { scriptId }
        });
        return;
    }
    //getRandom
    getRandomRepo = async() => {
        const  randomScripts = await Scripts.findAll()
        return randomScripts;
    }

    
}

module.exports = ScriptsRepository;