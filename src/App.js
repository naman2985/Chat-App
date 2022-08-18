import './App.css';
import ChatWindow from './components/chat-interface';
import ChatList from './components/chat-list';
import { useState, useEffect } from 'react';
import User from './components/home';
import axios from 'axios';

function App() {
  const [isValidated, setValidated] = useState(false);
  const [sender, setsender] = useState(null);
  const [receiver, setreceiver] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get("http://localhost:3001/users/all").then((u) => {
        setUsers(u.data);
        console.log(u);
      });
      /*const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        console.log(loggedInUser);
        setsender(JSON.parse(loggedInUser));
        setValidated(true);
      }*/
    }
    fetchData();
  }, []);
  
  function changeValidationState(user, valid) {
    setsender(user);
    setValidated(valid);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function logout() {
    setValidated(false);
    setsender(null);
    console.log(localStorage.getItem('user'));
    localStorage.clear();
  }

  return (
    <>
      {isValidated ? (
        <>
          <div className="top-bar">
            <button onClick={logout} className="logout">
              Logout
            </button>
          </div>
          <div className="app">
            <ChatList users={users} sender={sender} setReceiver={setreceiver} />
            <ChatWindow sender={sender} receiver={receiver} />
          </div>
        </>
      ) : (
        <User changeValidationState={changeValidationState} />
      )}
    </>
  );
}

export default App;
