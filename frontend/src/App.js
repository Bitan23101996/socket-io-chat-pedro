import "./App.css";
import ChatBox from "./Components/ChatBox";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";

//Link: https://github.com/socketio/socket.io-client/issues/641
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling", "flashsocket"],
});

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChatBox, setShowChatBox] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      setShowChatBox(true);
      socket.emit("join_room", room);
    } else {
      alert("Invalid input")
      setShowChatBox(false);
    }
  };

 /*  useEffect(() => {
    setShowChatBox(false)
  }, []) */
  

  return (
    <div className="App">
      {!showChatBox ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Type Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Type Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button type="button" onClick={joinRoom}>
            JOIN ROOM
          </button>
        </div>
      ) : (
        <ChatBox socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
