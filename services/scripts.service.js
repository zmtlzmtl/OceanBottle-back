const ScriptsRepository = require('../repositories/scripts.repository')
const PlusScriptRepository = require('../repositories/plusscript.repository')

class ScriptsService{
    constructor(){
        this.scriptsRepository = new ScriptsRepository();
        this.plusScriptRepository = new PlusScriptRepository(); 
    }
    
    //Script 생성
    createScript = async(userId,genre, title, content,) =>{
        await this.scriptsRepository.createScript(userId, genre, title, content)
        
        return;
    }

    //Script 상세 조회
    findOneScript = async( scriptId ) => {
        const script = await this.ScriptsRepository.findOneScript( scriptId )
        const plusScript  = await this.plusScriptRepository.findPlusScripts( scriptId );
        //사용자에게 보여줄 데이터 가공 
        const result = [
            {
            scriptId: script.scriptId,
            userId: script.UserId,
            id:script.user.id,
            genre: script.genre,
            title: script.title,
            content: script.content,
            createAt:script.createAt,
            updatedAt:script.updatedAt
            },
            {
            plusScriptId: plusScript.plusScriptId,
            userId: plusScript.UserId,
            id:plusScript.id,
            title: plusScript.title,
            content:plusScript.content,
            createAt:plusScript.createAt,
            updatedAt:plusScript.updatedAt
            }
    ];   
   
        return result;
    }

    //Script 랜덤 5개 가져오기
    findRandomscript = async()=> {
        const randomScript = await this.ScriptsRepository.findRandomscript()
        const randomData = [];
        for(let i = 0; i < 5; i++){
            randomData = randomScript[Math.floor(Math.random() * randomScript.length)];
       }
       return randomData;       
    }

    findAllscript = async() => {
        const allScript = await this.ScriptsRepository.findAllScript()

        return allScript;
    }    

    


}

module.exports = ScriptsService;