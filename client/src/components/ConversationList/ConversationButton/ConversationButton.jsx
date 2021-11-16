import React, {useEffect} from 'react';
import {useDispatch,useSelector } from "react-redux";
import { setCurrentConversation,  } from '../../../store/AuthReducer';
import { getMessages } from '../../../store/actions/UserActions';
import { Typography } from '@mui/material';

const ConversationButton = (props)=> {

    const dispatch = useDispatch();
    const user = useSelector(state=> state.user)


    
    function onChangeCurrentConversation(){
        dispatch(setCurrentConversation(props))
        dispatch(getMessages(props._id))
       
    }

    return (
       <div onClick={onChangeCurrentConversation}>
           <Typography variant="subtitle2">{props.members?.find(member=> member._id !== user.id).name}</Typography>
       </div>
    );
}

export default ConversationButton;