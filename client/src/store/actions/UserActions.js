import UserService from "../../services/UserService";
import ChatService from "../../services/ChatServise";
import {setSearchedUsers, setConversations, setConversationMessages} from "../AuthReducer";



export const getAllByName = (name) => {
    return async (dispatch) => {

        const response = await UserService.search(name);
        dispatch(setSearchedUsers(response.data));
    }
}

export const getConversations = (userId) => {
    return async (dispatch) => {
        const response = await ChatService.getConversations(userId);
    
        dispatch(setConversations([...response.data.conversations]));
    }
}

export const createConversation = (members, isGroup) => {
    return async (dispatch) => {
        const newConversation = await ChatService.createConversation(members, isGroup);
 
    }
}

export const getMessages = (conversationId) => {
    return async (dispatch) => {
        const response  = await ChatService.getConversationMessages(conversationId);
        
 
        dispatch(setConversationMessages(response.data.messages));
    }
}

export const sendMessage = (message) => {
    return async (dispatch) => {

        const response  = await ChatService.sendMessage(message);
        
    }
}



