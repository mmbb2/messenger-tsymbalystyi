import AuthService from "../../services/AuthService";
import {setUser, setAuth} from "../AuthReducer";
import axios from "axios";
import {API_URL} from "../../http/index.js";



export const login = (email, password) => {
    return async (dispatch) => {
        const response = await AuthService.login(email, password);
        console.log(response)
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
    }
}

export const registration = (email, password, name) => {
    return async (dispatch) => {
        const response = await AuthService.registration(email, password, name);
        console.log(response)
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
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
    }
}

