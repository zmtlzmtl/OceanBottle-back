const ScriptsRepository = require('../repositories/scripts.repository')

class ScriptsService{
    scriptsRepository = new ScriptsRepository();
    //Script 생성
    createScript = async(userId,genre, title, content,) =>{
        await this.ScriptsRepository.createScript(userId, genre, title, content)
        
        return;
    }

    //Script 상세보기
    findOneScript = async( scriptId ) => {
        const script = await this.ScriptsRepository.findOneScript( scriptId )
       
        return [
          {
            scriptId: script.scriptId,
            UserId: script.UserId,
            id: script.id,
            genre: script.genre,
            title: script.title,
            content: script.content,
            createdAt: script.createdAt,
            updatedAt: script.updatedAt,
          },
          {

          }
        ];
    }


}

module.exports = ScriptsService