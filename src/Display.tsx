import React, {useEffect, useContext, useState} from 'react';
import {UserContext, CommentContext} from './AppContext';
import Button from '@mui/material/Button';
import CommentThread from './CommentThread';
import AddCommentCard from './AddCommentCard';
const commentSection = {
      margin:"auto",
      width:"650px",
      maxWidth:"calc(100% - 1rem)",
      marginTop:"2rem",
      marginBottom:"5rem"
    };
export default function Display(){
  const {comments,actions} = useContext(CommentContext);
  //const [comments, setComments] = useState(context.comments)
  const {user,setUser} = useContext(UserContext);
   useEffect(()=>{
     console.log("displaying comments")
     console.log(comments)
     console.log(user)
   },[comments, user])

   const addComment=(newComment)=>{
     actions.addComment(newComment);
   }

   if(comments.length===0)
   {
     return(
       <></>
     )
   }
   return(
     <div className="comment-section" style={commentSection}>
     <br/>
     {
      comments.map((comment)=>{
         return(
         <div>
           <CommentThread>
            {comment}
           </CommentThread>
          </div>

         )
        })
     }

     <div className="add-comment">
       <AddCommentCard label="Add a comment" addNewComment={addComment}/>
     </div>
     </div>
   )
}
