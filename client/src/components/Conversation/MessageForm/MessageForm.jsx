import React, { useState } from 'react';
import {useSelector} from "react-redux";
import { socket } from '../Conversation';
import { TextField, IconButton,Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import FileService from '../../../services/FileService';

const MessageForm = ()=>{

    const [text, setText] = useState('');
    const [pictures, setPictures] = useState([])
    const [isFiles, setIsFiles] = useState(false)

    const user = useSelector(state=> state.user)
    const conversation = useSelector(state=> state.currentConversation)

    async function onSend(){
        const message = {
                    sender: user.id,
                    conversationId: conversation._id,
                    text: text,
            
                }
        if(isFiles){
            console.log('inside',pictures.length)
            const resp = await FileService.save(pictures)
            console.log(resp)
            message.photos = resp.data
        }
        setIsFiles(false)
       if(conversation._id === null){
         socket.emit("createNewConversationWithMessage", {
           members: conversation.members.map(member=>member._id || member.id),
            message: message
         })} else{

            socket.emit("message", message)
      }
      setText('')
      setPictures([])
      setIsFiles(false)
   }

   function onFilesSelect(e){
    setIsFiles(true)
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append(`image`, files[i])
    }

    setPictures(formData)
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
            <div>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" sx={{display: "none"}} inputProps={{ multiple: true }} onChange={onFilesSelect}  />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <ImageIcon />
                    </IconButton>
                </label>
            </div>
            
    
            <IconButton  onClick={onSend}>
                <SendIcon />
            </IconButton>
            
            
        </div>
    );
}

export default MessageForm;