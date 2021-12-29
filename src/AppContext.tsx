import React, {useState,useEffect, createContext} from 'react';
import Display from './Display';
import uuid from 'react-uuid';
export const UserContext = createContext("Rajesh");
export const CommentContext = createContext([]);
interface IUser{
  image:{};
  username:string;
}
interface IComment{
  id:number;
  content:number;
  createdAt:string;
  score:number;
  user:IUser;
  replies:IComment[];
}
export default function AppContext(props){
  const [comments, setComments]=useState([])
  const [user, setUser]=useState("")
  const addComment=(newComment)=>{
    console.log(newComment);
    var temp = comments.slice();
    temp.push(newComment)
    setComments(temp);
    localStorage.setItem('comments',JSON.stringify(temp))
  }
  const addReply=(reply)=>{
    console.log("adding reply to "+reply.parentId)
    let id = reply.parentId;
    var index=-1;
    var temp = comments.slice();
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        index = i;
        break;
      }
    }
    temp[i].replies.push(reply)
    setComments(temp)
    localStorage.setItem('comments',JSON.stringify(temp))

  }
  const changeScore=(id, parentId, changeValue)=>{
    var temp = comments.slice();
    if(id===parentId)
    {
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp[i].score = temp[i].score+changeValue<0?0: temp[i].score+changeValue;
          break;
        }
      }
    }

    else{
      var ind=-1;
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].id === parentId) {
          ind = i;
          break;
        }
      }

      for(var i=0;i<temp[ind].replies.length;i++)
      {
        if(temp[ind].replies[i].id===id)
        {
          temp[ind].replies[i].score = temp[ind].replies[i].score+changeValue<0?0: temp[ind].replies[i].score+changeValue;
          break;
        }
      }
    }

    console.log(id+" "+parentId)
    console.log("incremented")
    console.log(temp)
    setComments(temp)
    localStorage.setItem('comments',JSON.stringify(temp))
  }
  const decrementScore=(id, parentId)=>{
    console.log(id+" "+parentId)
  }
  const deleteComment=(id)=>{

  }
  const getData=()=>{
  if(localStorage.getItem('comments'))
    {
      console.log(JSON.parse(localStorage.getItem('comments')))
      setComments(JSON.parse(localStorage.getItem('comments')))
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    else{

        fetch('data.json'
        ,{
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            const allComments = myJson.comments.map((comment)=>{
              comment.parentId = comment.id
              comment.replies.map((reply)=>{
                reply.parentId = comment.id
              })
            })
            console.log("updated comments")
            console.log(myJson.currentUser)
            console.log(myJson.comments)
            setComments(myJson.comments)
            setUser(myJson.currentUser)
            localStorage.setItem('comments',JSON.stringify(myJson.comments))
            localStorage.setItem('user',JSON.stringify(myJson.currentUser))
          });
        }
    }

  useEffect(()=>{
    getData()
  },[])
  useEffect(()=>{
    console.log("useEffect comments")
    console.log(comments)
  },[comments])
  const actions = {addComment,addReply,changeScore, deleteComment}
  return(
    <UserContext.Provider value={{user, setUser}}>
      <CommentContext.Provider value={{comments,actions}}>
        {props.children}
      </CommentContext.Provider>
    </UserContext.Provider>
  )
}
