const ConversationService = require('../service/conversation-servise.js')

class ConversationController{
    async create(req, res, next){
        try{
            const {members, isGroup} = req.body;
            const conversation = await ConversationService.createConversation(members, isGroup);

            return res.json(conversation);
        }
        catch(e){
            console.log(e);
        }
    }

    async findAllOfUser(req, res, next){
        const {userId} = req.params;
        const conversations = await ConversationService.findAllConversationOfUser(userId);

        return res.json(conversations);
    }
   
}

module.exports = new ConversationController();  