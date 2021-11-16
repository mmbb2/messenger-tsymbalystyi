const uuid = require('uuid');
const path = require('path');




class FileService{

        saveFile(files){
            
            const fileNames = [] ;
            function pushFile(file){
                const fileName = uuid.v4() + '.jpg';
                const filePath = path.resolve('static', fileName);
                file.mv(filePath);
                fileNames.push(fileName)
            }
        try {
            if(Array.isArray(files)){
                for(let file of files){
                    pushFile(file)
                }
            }else{
                pushFile(files)
            }
            
            
            return fileNames;
        } catch (e) {
            console.log(e)
        }
        
    }




}

module.exports = new FileService();