import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { createConversation, getConversations } from '../../../store/actions/UserActions';
import { socket } from '../../Conversation/Conversation';
import { setCurrentConversation } from '../../../store/AuthReducer';

const SearchedUser = (props)=> {

    const dispatch = useDispatch();
    const user = useSelector(state=> state.user)

    

    function onCreateConversation(){
      dispatch(setCurrentConversation({members:[user.id, props._id], _id: null }))
    }

    return (
       <div>
           <div onClick={onCreateConversation}>
           <p>{props.name}</p>
           <p>{props.email}</p>
           </div>
           <hr/>
       </div>
    );
}

export default SearchedUser;