const UsersRepository = require("../repositories/users.repository");

class UsersService {
    constructor() {
        this.usersRepository = new UsersRepository();
    }

    postCreateUser = async ({ id, password }) => {
        const isExistUser = await this.usersRepository.LoginUser({ id });
        
        if (isExistUser) {
            const e = new Error("중복 된 아이디가 존재합니다."); 
            e.name = '412';
            throw e; 
        };

        const user = await this.usersRepository.postCreateUser({ id, password });
        return user;
    };

    postLoginUser = async ({ id, password }) => {
        console.log(id, password)
        const user = await this.usersRepository.LoginUser({ id })
        console.log(user)
        if ( !user || password !== user.password) { 
            const e = new Error("아이디 또는 비밀번호가 다릅니다.");
            e.name = '412';
            throw e;
        };
        return user;
    }
}
module.exports= UsersService;