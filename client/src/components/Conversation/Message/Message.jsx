import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, ListItemAvatar, ListItemText } from "@mui/material";

const Message = (props) => {

  let photosBlock
  if(props.photos[0] !== ""){
    photosBlock = props.photos.map((element) =>  <img key={element} className="message-image" src={`http://localhost:5000/${element}`} alt="" />);
  } else{
    photosBlock = null
  }
  

  return (
    <>
      <ListItemAvatar></ListItemAvatar>
      <ListItemText>
        <Typography variant="overline">{props.sender.name}</Typography>
        <Typography>{props.text}</Typography>
        {photosBlock}
      </ListItemText>
     
    </>
  );
};

export default Message;
