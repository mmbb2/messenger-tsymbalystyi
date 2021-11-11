import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import { io } from 'socket.io-client';
import {setCurrentConversation, updateConversationMessages, updateConversations,} from '../../store/AuthReducer';
import { getMessages } from '../../store/actions/UserActions';
import { List,ListItem ,ListItemText ,ListItemAvatar , ListItemButton, Typography } from '@mui/material';

export let socket;

const Conversation = ()=> {
    
    const dispatch = useDispatch();
    const conversation = useSelector(state=> state.currentConversation)
    const user = useSelector(state => state.user)
    const conversations = useSelector(state => state.conversations)

    useEffect(() => {

        console.log("user from store", user)
        console.log("conversations from store", conversations)
        const rooms = conversations.map(conversation => conversation._id)
        console.log("rooms", Array.isArray(rooms))
            
        socket = io("http://localhost:5000", { query: { id: user.id, rooms} });

        socket.on("connect", () => {  
            console.log(socket.id); 
        })
        socket.on("disconnect", () => {  
            console.log("disc"); 
        })

        socket.on("message", (message) => {
            console.log("пришедшее сообщение", message)  
            dispatch(updateConversationMessages(message))
        })

        socket.on("newConversation", ({conversation, sender}) => {

            console.log("mewConvers", conversation)
            dispatch(updateConversations(conversation))
            if(sender === user.id){
                dispatch(setCurrentConversation(conversation))
                dispatch(getMessages(conversation._id))
            }
            socket.emit("joinToConversation",conversation._id )
        })


    }, [])

    useEffect(() => {
        if(conversation._id){
            console.log("Useeff")
        }
        
    }, [conversation])

    

    return (
        <>
        <Typography>
            {conversation._id}
        </Typography>
        <List className="conversation">
                {
                conversation.messages?.map(message=> {
                    return(
                        <ListItem>
                            <ListItemButton >
                                <ListItemAvatar>
                                </ListItemAvatar>
                                <ListItemText>
                                        <Message {...message}/>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )})
                }
       </List>  
        <MessageForm />
        </>
        
    );
}

export default Conversation;