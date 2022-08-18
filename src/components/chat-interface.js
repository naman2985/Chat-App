import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import './styles/styles.css'

function ChatWindow(props) {
  const [currentChat, setCurrent] = useState('');
  const [chats, setchats] = useState(null);
  const [chatView, setChatView] = useState(<></>);
  async function onload() {
    if (props.receiver) {
      await axios.post("http://localhost:3001/chats/get", { user1: props.sender.name, user2: props.receiver.name })
        .then((messages) => {
          setchats(messages.data);
          console.log(chats);
          console.log(
            `Sender:${props.sender.id}\n Receiver:${props.receiver._id}`
          );
          if (chats) {
            setChatView(
              chats.map((item) =>
                <div
                  className={item.sender === props.sender.id ? "chat-1" : "chat-2"}
                  key={nanoid()}
                >
                  {item.message}
                </div>
              )
            );
          }
        })
        .catch((err) => console.log(err));
    }
  }
  onload();
  function handleChange(e) {
    e.preventDefault();
    setCurrent(e.target.value);
  }
  async function updateChat(e) {
    e.preventDefault();
    if (currentChat !== "" && props.receiver) {
      console.log("Chat View" + chatView);
      const message = {
        sender: props.sender.id,
        receiver: props.receiver._id,
        message: currentChat,
      };
      console.log(props.receiver);
      await axios.post("http://localhost:3001/chats/post", message)
        .then(res => {
          setchats([...chats, currentChat]);
          setChatView(
            { chatView } +
            <div
              className="chat-2"
              key={nanoid()}
            >
              {currentChat}
            </div>
          );
          setCurrent("");
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }
  return (
    <div className="chat-screen">
      <div className="scrollable">{chatView}</div>
      <div className="text-bar">
        <input
          type="text"
          value={currentChat}
          placeholder="Type your message"
          onChange={handleChange}
        />
        <button onClick={updateChat} className="send">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;