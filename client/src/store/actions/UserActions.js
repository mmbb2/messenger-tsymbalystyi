import UserService from "../../services/UserService";
import {setSearchedUsers} from "../AuthReducer";



export const getAllByName = (name) => {
    return async (dispatch) => {
        console.log(name, 'useraction')
        const response = await UserService.search(name);
        console.log(response)
        dispatch(setSearchedUsers(response.data));
    }
}


