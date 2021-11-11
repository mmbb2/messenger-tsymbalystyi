import AuthService from "../../services/AuthService";
import ChatService from "../../services/ChatServise";
import {setUser, setAuth, setConversations} from "../AuthReducer";
import axios from "axios";
import {API_URL} from "../../http/index.js";



export const login = (email, password) => {
    return async (dispatch) => {
        const response = await AuthService.login(email, password);
        localStorage.setItem('token', response.data.accessToken);
        
        dispatch(setUser(response.data.user));
        const conversationsResponse = await ChatService.getConversations(response.data.user.id);
        console.log(conversationsResponse.data)
        dispatch(setConversations(conversationsResponse.data.conversations));
        dispatch(setAuth(true));
    }
}

export const registration = (email, password, name) => {
    return async (dispatch) => {
        const response = await AuthService.registration(email, password, name);
   
    }
}

export const logout = () => { 
    return async (dispatch) => {
        const response = await AuthService.logout();
        localStorage.removeItem('token');
        dispatch(setAuth(false));
        dispatch(setUser({}));
    }
}

export const checkAuth = () => { 
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})

        localStorage.setItem('token', response.data.accessToken);
        
        dispatch(setUser(response.data.user));

        const conversationsResponse = await ChatService.getConversations(response.data.user.id);
        console.log(conversationsResponse.data)
        dispatch(setConversations(conversationsResponse.data.conversations));
        dispatch(setAuth(true));
    }
}

