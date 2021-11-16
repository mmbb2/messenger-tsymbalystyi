import React, { useEffect, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import { io } from 'socket.io-client';
import {setCurrentConversation, updateConversationMessages, updateConversations,} from '../../store/AuthReducer';
import { getMessages } from '../../store/actions/UserActions';
import { List,ListItem , Typography } from '@mui/material';
import ScrollToBottom from 'react-scroll-to-bottom';
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

    const messagesBottom = useRef(null);

    const scrollToBottom = (ref) => {
      ref.current?.scrollIntoView();
    };
  
    useEffect(() => {
      scrollToBottom(messagesBottom);
    }, [conversation]);

    return (
        <>{
            Object.entries(conversation).length !== 0 ?
            <>
        <Typography>
            {conversation?.members?.find(member=> (member._id || member.id ) !== user.id).name}
        </Typography>
        
            <List className="conversation">
                {
                conversation.messages?.map(message=> {
                    return(
                        <ListItem key={message._id}>
                            <Message {...message}/>
                        </ListItem>
                    )})
                }
                <div ref={messagesBottom}></div>
            </List>  
            
        
        <MessageForm />
        </>
        :   
        <>
        </>    
        }
        </>
        
    );
}

export default Conversation;