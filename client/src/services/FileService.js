import $api from "../http";


export default class FileService {
    static async save(files){
        console.log(files, "files");
        return  $api.post(`/files/save`, files)
    }
}

