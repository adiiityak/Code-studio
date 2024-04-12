import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/editor";


const EditorPage = () => {
  const [clients, setCLients] = useState([
  {socketId:1, username: 'Aditya'},
  {socketId:2, username: 'Kanojiya'}
]);

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
        <button className="btn copyBtn">Copy ROOM ID</button>
                <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
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