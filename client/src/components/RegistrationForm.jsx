import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../store/actions/AuthActions";
import { useHistory  } from 'react-router-dom';

const LoginForm = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    function onRegistration(){
        dispatch(registration(email, password, name));
        history.push("/login");
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
            <input 
                onChange = {e=>{setName(e.target.value)}} 
                value = {name}
                type="text"
                placeholder = "name"
            />
            <button onClick={onRegistration} >Sign up</button>
            


        </div>
    );
}

export default LoginForm;