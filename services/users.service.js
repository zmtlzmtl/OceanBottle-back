const UsersRepository = require("../repositories/users.repository");

class UsersService {
    constructor() {
        this.usersRepository = new UsersRepository();
    }
    postCreateUser = async ({ id, password }) => {
        const user = await this.usersRepository.postCreateUser({ id, password });

        if (!user || password !== user.password) {
            const e = new Error('아이디 또는 비밀번호가 다릅니다.');
            e.name = '412';
            throw e; 
        };
        console.log(user)
        return user;
    }
    postLoginUser = async ({ id, password }) => {
        const user = await this.usersRepository.postLoginUser({ id })
        
        if ( id !== user.id || password !== user.password) {  //이부분의 아이디 검증이 필요할까?
            const e = new Error('아이디 또는 비밀번호가 다릅니다.');
            e.name = '412';
            throw e;
        };
        return user;
    }
}
module.exports= UsersService;