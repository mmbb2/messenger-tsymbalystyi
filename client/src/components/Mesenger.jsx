import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { logout} from "../store/actions/AuthActions";
import { useHistory  } from 'react-router-dom';


const Mesenger = ()=> {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state=> state.user)
    const [searchValue, setSearchValue] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])

    function onLogout(){
        dispatch(logout());
        history.push("/login");
    }

    function onSearch(){
        dispatch(logout());
    }

    return (
        <div>
            <p>{user.name}</p>
            <button onClick={onLogout} >Logout</button>

            <input 
                onChange = {e=>{setSearchValue(e.target.value)}} 
                value = {searchValue}
                type="text"
                placeholder = "search"
            />

            <button onClick={onLogout} >Search</button>

        </div>
    );
}

export default Mesenger;