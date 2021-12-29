import React,{useEffect, useState, useContext} from 'react';
import {UserContext, CommentContext} from './AppContext';
import CommentCard from './CommentCard';
import AddCommentCard from './AddCommentCard';
const repliesSection={
  marginLeft:"2rem",
  marginTop:"1rem",
  borderLeft:"0.5px solid hsl(211, 10%, 45%)"
}
const styleWithMargin={
  marginTop:"1rem",
  marginLeft:"4rem"
}
const styleWithoutMargin={
  marginTop:"1rem",
  marginLeft:"0"
}
const addComment={border:"none"}
export default function CommentThread(props){


  const {comments,actions} = useContext(CommentContext);

  const [reply, setReply] = useState({
    replyEnabled:false,
    replyId:-1,
  })

  useEffect(()=>{
    console.log("displaying comment card")
    console.log(props.children)
  },[])

  const handleReply=(id)=>{
    console.log("okay replying to "+id)
    console.log(props.children.id+" "+props.children.parentId)
    setReply({
      replyEnabled:true,
      replyId:id
    })
  }
  const cancelReply=()=>{
    setReply({
      replyEnabled:false,
      replyId:-1
    })
  }
  const addReply=(newComment)=>{
    console.log("adding reply")
    console.log(newComment)
    actions.addReply(newComment);
    cancelReply()
  }

  return(
    <div className="comment-section">
      <CommentCard onReply={(id)=>handleReply(id)}>{props.children}</CommentCard>
      {
        reply.replyId===props.children.id?
        <div style={props.children.id===props.children.parentId?styleWithMargin:styleWithoutMargin} className="add-comment">
          <AddCommentCard style={{marginLeft:"2rem"}} label="Add a reply" parentId={props.children.parentId} addNewComment={addReply}/>
        </div>:
        <></>
      }
      <div className="replies-section" style={repliesSection}>
      {
        props?.children?.replies?.map((comment)=>{
          return(
          <div style={{marginLeft:"2rem"}}>
            <CommentThread>
             {comment}
            </CommentThread>
           </div>

          )
         })
      }
      </div>
    </div>
  )
}
