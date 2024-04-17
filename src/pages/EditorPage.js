import React, { useRef, useState } from "react";
import { useEffect } from "react";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor.js";
import { initsocket } from "../socket";
import { Navigate, useLocation,useNavigate,useParams } from "react-router-dom";
import toast from "react-hot-toast";


const EditorPage = () => {
  const socketRef = useRef(null)
  const codeRef = useRef(null)
  const location = useLocation()
  const reactNavigator = useNavigate()
  const {roomId} = useParams()

  const [clients, setCLients] = useState([]);

  useEffect(()=>{
    const init = async()=>{
      socketRef.current = await initsocket()
      socketRef.current.on('connect_error',(err)=>handleErrors(err))
      socketRef.current.on('connect_failed',(err)=>handleErrors(err))
      function handleErrors(e){
        console.log('socket error: ',e);
        toast.error('Socket connection failed, try again later')
        reactNavigator('/')
      }
      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        username: location.state?.username,

      })

      socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
        if(username != location.state?.username){
          toast.success(`${username} joined the room `)
        }
        setCLients(clients)
        socketRef.current.emit(ACTIONS.SYNC_CODE,{
          code:codeRef.current,
          socketId
        })
      })

      socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
        toast.success(`${username} left the room`)
        setCLients((prev)=>{
          return prev.filter((client)=>client.socketId !== socketId)
        })
      })
    }
    init()
    return ()=>{
      socketRef.current.off(ACTIONS.JOINED)
      socketRef.current.off(ACTIONS.DISCONNECTED)
      socketRef.current.disconnect()
    }
  },[])

  async function copyRoomId(){
    try{
      await navigator.clipboard.writeText(roomId)
      toast.success("Room Id Copied")
    }catch(err){
      toast.error("Error in copying")
      console.log("Room Id copy error:",err)
    }
  }

  async function leaveRoom(){
    reactNavigator('/')
  }
  
if(!location.state){
  return <Navigate to="/" />
}

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/codestudio.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>Copy ROOM ID</button>
                <button className="btn leaveBtn" onClick={leaveRoom}>Leave</button>
      </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange = {(code)=>{codeRef.current = code}}/>
      </div>
    </div>
  );
};

export default EditorPage;


// import React from 'react'

// const editorPage = () => {
//   return (
//     <div>editorPage</div>
//   )
// }

// export default editorPage