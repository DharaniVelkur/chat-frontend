import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';
const socket =io.connect("https://chat-backend-c38z.onrender.com");
function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showchats,setShowchats]=useState(false);

  const joinRoom =() =>{
    if(username && room){
      socket.emit("join_room",room);
      setShowchats(true);
    }
  }
  return (
    <div className='App'>
      {!showchats ?
      <div className='joinChatContainer'>
     <h3>Join a Chat</h3>
     <input type='text' placeholder='John...' onChange={e=>setUsername(e.target.value  )}/>
     <input type='text' placeholder='Room ID...' onChange={e=>setRoom(e.target.value)}/>
     <button onClick={joinRoom}>Join A Room</button>
     </div> 
     : ( <Chat socket={socket} username={username} room={room}/>)}
    </div>
      
  );
}

export default App;
