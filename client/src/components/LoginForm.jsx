import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/actions/AuthActions";
import { useHistory  } from 'react-router-dom';

const LoginForm = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const user = useSelector(state=> state.user)
    const history = useHistory();

    function onLogin(){
        dispatch(login(email, password));
        history.push("/");
    }
   


    return (
        <div>
            <input 
                onChange = {e=>{setEmail(e.target.value)}} 
                value = {email}
                type="text"
                placeholder = "email"
            />
            <input 
                onChange = {e=>{setPassword(e.target.value)}} 
                value = {password}
                type="text"
                placeholder = "password"
            />
            <button onClick={onLogin} >Login</button>
            

        </div>
    );
}

export default LoginForm;