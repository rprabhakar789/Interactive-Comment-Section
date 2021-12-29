import React, {useEffect, useState, useContext} from 'react';
import {UserContext, CommentContext} from './AppContext';
import './commentCard.css';

const commentCard = {
  backgroundColor:"#FFF",
  minHeight: "4rem",
  padding:"1rem"

};
export default function CommentCard(props){
  const {actions} = useContext(CommentContext);
  const {user,setUser} = useContext(UserContext);
  const [imgUrl, setImgUrl] = useState("")
  const [comment, setComment] = useState(props.children)

  useEffect(()=>{
    console.log("comment card")
    console.log(props)
    console.log(actions)
    console.log("img src : "+props.children.user.image.png)
    setImgUrl(props.children.user.image.png)
  },[])

  const enableReply=(id)=>{
    console.log("replying to "+id)
    props.onReply(id)
  }
  const cancleReply=()=>{
    console.log("cancelling reply")
    props.onReply(-1)
  }
  return(
    <div className="comment-card">
        <div className="like-section">
          <div className="plus-minus">
            <img src='./images/icon-plus.svg' onClick={()=>{actions.changeScore(comment.id, comment.parentId,1)}}></img>
          </div>
          <p>{comment.score}</p>
          <div className="plus-minus">
            <img src='./images/icon-minus.svg' onClick={()=>{actions.changeScore(comment.id, comment.parentId,-1)}}></img>
          </div>
        </div>
        <div className="card-content">
          <div className="first-row">
            <div className="user-info">
              <img height="30px" width="30px" className="profile-image" src={imgUrl} alt="image"></img>
              <div className="username">{comment.user.username}</div>
              <div className="createdAt">{comment.createdAt}</div>
            </div>
            <div onClick={()=>enableReply(comment.id)} className="replyButton" ><img src="./images/icon-reply.svg"></img>&nbsp;Reply</div>
          </div>
        <div className="comment-content">
          {comment.content}
        </div>
      </div>
  </div>
  )
}
