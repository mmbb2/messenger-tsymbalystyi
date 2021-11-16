import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { logout} from "../store/actions/AuthActions";
import { getConversations } from '../store/actions/UserActions';
import { useHistory, NavLink  } from 'react-router-dom';
import UserSearchForm from './UserSearchForm/UserSearchForm';
import ConversationList from './ConversationList/ConversationList';
import Conversation from "./Conversation/Conversation";
import {Typography, Grid, Button} from '@mui/material';
import './Messenger.css'
import { List,ListItem ,ListItemText ,ListItemAvatar , ListItemButton } from '@mui/material';
import SearchedUser from './UserSearchForm/SearchedUser/SearchedUser';
import UserModal from './UserModal/UserModal';
const Mesenger = ()=> {

    
    const dispatch = useDispatch();
    const history = useHistory();
    const user =  useSelector(state => state.user)
    const searchedUsers = useSelector(state=> state.searchedUsers);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <Button onClick={handleOpen}>Open modal</Button>
                    <UserModal open={open} handleClose={handleClose}></UserModal>
                </Grid>
            </Grid>
            

            <Grid container spacing={0}>
                <Grid className="left" item xs={2} sx={{ border: 1, borderColor: 'primary.main' }}>
                    <UserSearchForm />
                    { searchedUsers.length ?  
                        <List>
                            {searchedUsers.map(user=>{
                                return( 
                                <ListItem>
                                    <ListItemButton sx={{ p: 0 }} >
                                        <ListItemAvatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                        <SearchedUser  {...user}/>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                )
                            })}
                        </List> :
                    <ConversationList />
                        }
                </Grid>
                <Grid item xs={10}>
                  <Conversation />
                </Grid>
            </Grid>

            
            
        </div>
    );
}

export default Mesenger;