import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { createConversation, getConversations } from '../../../store/actions/UserActions';
import { socket } from '../../Conversation/Conversation';
import { setCurrentConversation } from '../../../store/AuthReducer';
import { Typography } from '@mui/material';
const SearchedUser = (props)=> {

    const dispatch = useDispatch();
    const user = useSelector(state=> state.user)

    

    function onCreateConversation(){
      dispatch(setCurrentConversation({members:[user, props], _id: null }))
    }

    return (
           <div onClick={onCreateConversation}>
           <Typography>{props.name}</Typography>
           <Typography>{props.email}</Typography>
           </div>
    );
}

export default SearchedUser;