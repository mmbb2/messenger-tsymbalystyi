import $api from "../http";


export default class UserService {
    static async search(name){
        return $api.get('/findUsers', {name})
    }
}

