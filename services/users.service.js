const UsersRepository = require("../repositories/users.repository");

class UsersService {
    constructor() {
        this.usersRepository = new UsersRepository();
    }

    postCreateUser = async ({ id, password }) => {
        const isExistUser = await this.usersRepository.LoginUser({ id });
        
        const re_id = /^[a-z0-9]{5,10}$/;
        const re_password = /^[a-zA-Z0-9`~!@#$%^&*()-_=+]{8,}$/;

        if (isExistUser) {
            const e = new Error("중복 된 아이디가 존재합니다."); 
            e.name = '412';
            throw e; 
        };
        if(!re_id.test(id)) {
            const e = new Error("아이디의 형식이 일치하지 않습니다."); 
            e.name = '400';
            throw e;
        }
        if(!re_password.test(password)) {
            const e = new Error("비밀번호의 형식이 일치하지 않습니다."); 
            e.name = '400';
            throw e; 
        };
        const user = await this.usersRepository.postCreateUser({ id, password });
        return user;
    };

    postLoginUser = async ({ id, password }) => {
        const user = await this.usersRepository.LoginUser({ id })        
        if ( !user || password !== user.password) { 
            const e = new Error("아이디 또는 비밀번호가 다릅니다.");
            e.name = '412';
            throw e;
        };
        return user;
    }
    myPage = async ({ userId, id }) => {
        const myScript = await this.usersRepository.myScript({ userId, id });
        const myPlusScript = await this.usersRepository.findPlusScript({ userId, id });

        // console.log(myPlusScript[0].ScriptId)
        // console.log(myPlusScript)
        for (let i = 0; i < myPlusScript.length; i++) {
            myPlusScript[i] = await this.usersRepository.myPlusScript({
                scriptId: myPlusScript[i].ScriptId
            })
        }
        const page = { id, myScript, myPlusScript }

        return page;
    }
}
module.exports= UsersService;