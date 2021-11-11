import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { logout} from "../store/actions/AuthActions";
import { getConversations } from '../store/actions/UserActions';
import { useHistory, NavLink  } from 'react-router-dom';
import UserSearchForm from './UserSearchForm/UserSearchForm';
import ConversationList from './ConversationList/ConversationList';
import Conversation from "./Conversation/Conversation";
import {Typography, Grid, Button} from '@mui/material';
import './Messenger.css'
const Mesenger = ()=> {

    
    const dispatch = useDispatch();
    const history = useHistory();
    const user =  useSelector(state => state.user)

    


    // useEffect(() => {
    //     if(user){
    //         dispatch(getConversations(user.id))
    //     }
    // }, [dispatch])
   
    
    function onLogout(){
        dispatch(logout());
        history.push("/login");
    }

    return (
        <div className="container">

            <Grid container>
                <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    
                    <Typography variant="h5">{user.name}</Typography>
                    <Button variant="contained" onClick={onLogout}>Logout</Button>
                    <UserSearchForm/>
                </Grid>
            </Grid>
            

            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <ConversationList />
                </Grid>
                <Grid item xs={10}>
                  <Conversation />
                </Grid>
            </Grid>

            
            
        </div>
    );
}

export default Mesenger;