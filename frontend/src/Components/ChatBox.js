import React, { useState, useEffect } from "react";

// https://www.npmjs.com/package/react-scroll-to-bottom
import ScrollToBottom from 'react-scroll-to-bottom';


const ChatBox = ({ socket, username, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgDataList, setMsgDataList] = useState([]);

  const sentMessage = async () => {
    if (currentMsg !== "") {
      let msgPayload = {
        room: room,
        authorName: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sent_message", msgPayload);
      setCurrentMsg("")
      setMsgDataList((prevMsg) => [...prevMsg, msgPayload]);
     
    }
  };

  useEffect(() => {
    socket.on("receive_message", (receivedData) => {
      setMsgDataList((prevMsg) => [...prevMsg, receivedData]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      <ScrollToBottom className="message-container">

      {msgDataList.map((msgData, index) => {
          return (
            <div
              className="message"
              key={index}
              id={username === msgData.authorName ? "other" : "you"}
            >
              <div>
                <div className="message-content">
                  <p>{msgData.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{msgData.time}</p>
                  <p id="author">{msgData.authorName}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
        
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type message..."
          onKeyDown={(event)=> event.key === 'Enter' && sentMessage()}
          onChange={(e) => setCurrentMsg(e.target.value)}
          value={currentMsg}
        />
        <button type="button" onClick={sentMessage}>
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
