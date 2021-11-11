import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { sendMessage } from '../../../store/actions/UserActions';
import { socket } from '../Conversation';
import { TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const MessageForm = ()=>{

    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const user = useSelector(state=> state.user)
    const conversation = useSelector(state=> state.currentConversation)

    function onSend(){
        const message = {
            sender: user.id,
            conversationId: conversation._id,
            text: text
            }

       if(conversation._id === null){
        socket.emit("createNewConversationWithMessage", {
           members: conversation.members,
           message: message
        })} else{

           socket.emit("message", message)
        }
        
   }


    return (
        <div className="message-input">
            <TextField  className="message-text-field"
                onChange = {e=>{setText(e.target.value)}} 
                value = {text}
                variant="filled"
                label="Write a message..."
                fullWidth 
            />
            <IconButton aria-label="delete">
                <SendIcon  onClick={onSend}/>
            </IconButton>
            
        </div>
    );
}

export default MessageForm;