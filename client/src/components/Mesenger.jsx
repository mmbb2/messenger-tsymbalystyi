import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { logout} from "../store/actions/AuthActions";
import { getAllByName } from '../store/actions/UserActions';
import { useHistory  } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../http';


const Mesenger = ()=> {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state=> state.user)
    const [searchValue, setSearchValue] = useState('')



    function onLogout(){
        dispatch(logout());
        history.push("/login");
    }

     function onSearch(){
        console.log(searchValue, " form")
       dispatch(getAllByName(searchValue));


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

            <button onClick={onSearch} >Search</button>

        </div>
    );
}

export default Mesenger;