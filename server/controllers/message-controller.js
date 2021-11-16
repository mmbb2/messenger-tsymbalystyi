const MessageService = require('../service/message-service.js')


class MessageController{

    async send(req, res, next){
        try{
            const {conversationId, sender, text, photos, files, forwardFrom, reply} = req.body;
            const message = await MessageService.addMessage({conversationId, sender, text, photos, files, forwardFrom, reply});
           // console.log(message)
            return res.json(message);
        }
        catch(e){
            console.log(e);
        }
    }
    
    async getAllOfConversation(req, res, next){
        try{
            const {conversationId} = req.params;
            const messages = await MessageService.findAllOfConversation(conversationId)
            return res.json(messages);
        }
        catch(e){
            console.log(e);
        }
    }

    

   
}

module.exports = new MessageController();  