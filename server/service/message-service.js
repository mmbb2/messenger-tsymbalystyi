const MessageModel = require('../models/message-model');

class MessageService{

    async addMessage(message){
    
        const createdMessage = await MessageModel.create({...message, date: Date.now()})

        const newMessage = await MessageModel.findById(createdMessage._id).populate({
            path: 'sender',
            model: 'User'
        })
        return newMessage
        
    }

    async findAllOfConversation(conversationId){
    
        const messages = await MessageModel.find({conversationId}).populate({
            path: 'sender',
            model: 'User'
        });
        return{
            messages
        }
    }


}

module.exports = new MessageService();