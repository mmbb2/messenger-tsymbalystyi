import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Typography } from '@mui/material';

const Message = (props)=> {



    return (
       <>
         <Typography variant="overline">{props.sender.name}</Typography>
         <Typography>{props.text}</Typography>
       </>
    );
}

export default Message;