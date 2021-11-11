import React, {useEffect} from 'react';
import {useDispatch, } from "react-redux";
import { setCurrentConversation,  } from '../../../store/AuthReducer';
import { getMessages } from '../../../store/actions/UserActions';
import { Typography } from '@mui/material';

const ConversationButton = (props)=> {

    const dispatch = useDispatch();
    

    
    function onChangeCurrentConversation(){
        dispatch(setCurrentConversation(props))
        dispatch(getMessages(props._id))
    }

    return (
       <div onClick={onChangeCurrentConversation}>
           <Typography variant="subtitle2">id {`: ${props._id}`}</Typography>
       </div>
    );
}

export default ConversationButton;