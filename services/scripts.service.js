const ScriptsRepository = require('../repositories/scripts.repository')

class ScriptsService{
    scriptsRepository = new ScriptsRepository();

    //Script 생성
    createScript = async(userId,genre, title, content,) =>{
        await this.ScriptsRepository.createScript(userId, genre, title, content)
        
        return;
    }

    //Script 상세 조회
    findOneScript = async( scriptId ) => {
        const script = await this.ScriptsRepository.findOneScript( scriptId )
       
        //사용자에게 보여줄 데이터 가공 
        return script;
    }

    //Script 랜덤 5개 가져오기
    findRandomscript = async()=> {
        const randomScripts = await this.ScriptsRepository.findRandomscript()

        for (let i = 0; i < 5; i++){
        const randomValue = randomScripts[Math.floor(Math.random() * randomScripts.length)];
       }
       return randomValue;
        
    }

    


}

module.exports = ScriptsService