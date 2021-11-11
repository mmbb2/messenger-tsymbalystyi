import $api from "../http";


export default class ChatService {
    static async getConversations(userId){
        return  $api.get(`/conversation/${userId}`)
    }

    static async createConversation(members, isGroup){
        console.log(members, isGroup)
        return  $api.post(`/conversation/create`, {members, isGroup})
    }

    static async getConversationMessages(conversationId){
        return  $api.get(`/message/getAll/${conversationId}`)
    }

    static async sendMessage(message){
        return  $api.post(`/message/send`, {...message})
    }

}

    