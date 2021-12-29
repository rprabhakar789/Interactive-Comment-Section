import React, {useEffect, useState, useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {UserContext, CommentContext} from './AppContext';
import uuid from 'react-uuid';
import './commentCard.css';

const addCommentCard = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
};
const textField = {
  marginLeft:"1rem",
  width:"100%"
}
const sendButton={
  margin:"auto",
  width:"4rem",
  height:"2.5rem",
  marginLeft:"1rem"
}
export default function AddCommentCard(props){
  const {actions} = useContext(CommentContext);
  const {user,setUser} = useContext(UserContext);
  const [imgUrl, setImgUrl] = useState("")
  const [comment, setComment] = useState({content:""})

  useEffect(()=>{
    console.log(actions)
    console.log("img src : "+user.image.png)
    setImgUrl(user.image.png)
  },[])
  const handleSubmit=()=>{
    console.log(comment);
    var newComment = {
      id: Date.now(),
      parentId:props.parentId?props.parentId:Date.now(),
      content:comment.content,
      createdAt:"Just now",
      score:0,
      user:user,
      replies:[]
    }
    setComment({content:""})
    props.addNewComment(newComment)
  }
  return(
    <div className="comment-card" style={addCommentCard}>
        <div className="user-info">
          <img height="30px" width="30px" className="profile-image" src={imgUrl} alt="image"></img>
        </div>
        <TextField
          id="outlined-multiline-flexible"
          label={props.label}
          multiline
          maxRows={3}
          fullwidth="true"
          style={textField}
          value={comment.content}
          onChange={(e)=>{setComment({...comment, content:e.target.value})}}
        />
        <div>
        <Button style={sendButton} variant="contained" onClick={()=>handleSubmit()}>Send</Button>
        </div>
    </div>
  )
}
