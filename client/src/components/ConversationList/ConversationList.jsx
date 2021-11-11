import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {  } from '../../store/actions/UserActions';
import ConversationButton from './ConversationButton/ConversationButton';
import { List,ListItem ,ListItemText ,ListItemAvatar , ListItemButton } from '@mui/material';

const ConversationList = ()=> {

    const dispatch = useDispatch();
    const conversations = useSelector(state=> state.conversations)
    


    return (
        <List>
            {conversations?.map(conversation=>{
                return( 
                <ListItem>
                    <ListItemButton sx={{ p: 0 }} >
                        <ListItemAvatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <ConversationButton {...conversation}/>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                  
                )
            })}
                   
        </List>
            
    );
}

export default ConversationList;