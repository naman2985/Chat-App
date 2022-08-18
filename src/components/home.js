import Login from "./login";
import Register from "./register";
import { useState } from "react";
import axios from 'axios';

export default function User(props) {
  const [Purpose, setPurpose] = useState('login');
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const screen = (Purpose === "login") ? <Login onLogin={onLogin} setName={setName} setPassword={setPassword} name={name} password={password} valid={ valid } /> : <Register />;
  async function onLogin(e) {
    e.preventDefault();
    if (name && password) {
      const res = await axios.post("http://localhost:3001/users/login", {
        name: name,
        password: password
      });
      if (res.status === 200) {
        console.log(res.data);
        props.changeValidationState(res.data, true);
      }
      else setValid(false);
    }
  }

  return (
      <div className="form-user">
          <div className='form-user-header'>
              <button className={Purpose==='login'?"tab tab-active":"tab"} onClick={() => setPurpose("login")}>Login</button>
              <button className={Purpose==='register'?"tab tab-active":"tab"} onClick={() => setPurpose('register')}>Register</button>
          </div>
          <div className='form-user-body'>
              {screen}
          </div>
      </div>
  )
}