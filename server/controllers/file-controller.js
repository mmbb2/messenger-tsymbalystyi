const FileService = require('../service/file-servise')


class FileController{

    async save(req, res, next){
        try{
            const newFile = FileService.saveFile(req.files.image)

            console.log(newFile)
           return res.json(newFile);
        }
        catch(e){
            console.log(e);
        }
    }
    
}

module.exports = new FileController();  