import $api from "../http";


export default class UserService {
    static async search(name){
        console.log(name, "userservice");
        return  $api.get(`/findUsers/${name}`)
    }
}

