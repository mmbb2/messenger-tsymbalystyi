const ConversationModel = require('../models/сonversation-model');

class ConversationService{

    async createConversation(members, isGroup){

        console.log("createConversation", members, isGroup)
        
        if(!isGroup){
            const candidate = await ConversationModel.find({members: {"$all" : members}, isGroup: false })
            console.log("candidate ", candidate);
           if (!candidate.length){
            const conversation = await ConversationModel.create({members, isGroup});
            const populateConv = await ConversationModel.findById(conversation._id).populate({
                path: 'members',
                model: 'User'
            })
            return populateConv
            
           }
           return null
           
        }

        const conversation = await ConversationModel.create({members, isGroup});
        return conversation
        
    }

    async findAllConversationOfUser(userId){
        const conversations = await ConversationModel.find({members: {"$in" : [userId]} }).populate({
            path: 'members',
            model: 'User'
        })
        return{
            conversations
        }
    }

    async findAllUsersOfConversation(conversationId){
        
        const conversation = await ConversationModel.findById(conversationId);
        return  conversation.members
        
    }

}

module.exports = new ConversationService();