import React, {useState} from "react";
import axios from "axios";

export default function Register() {
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [nameTakenError, setNameTakenError] = useState(false);
  const passwordError = (<p className="form-error">
    Password and Confirmed Password do not match
  </p>)
  async function onSubmit(e) {
    e.preventDefault();
    if (confirmPassword === Password) {
      const res = await axios.post("http://localhost:3001/users/register", {
        name: Name,
        password:Password
      });
      console.log(res);
      if (res.data.message !== 'Name already taken') {
        setName('');
        setPassword('');
        setConfirmPassword('');
        setVisible(false);
        setNameTakenError(false);
      }
      else setNameTakenError(true);
    } else setVisible(true);
  }

  function changeName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function changePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function changeConfirmPassword(e) {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Username" className="form-input" value={Name} onChange={changeName} />
      {nameTakenError?<p>Username not available</p>:null}
      <input type="password" placeholder="Password" className="form-input" value={Password} onChange={changePassword}/>
      <input type="password" placeholder="Confirm Password" className="form-input" value={confirmPassword} onChange={changeConfirmPassword}/>
      {visible ? passwordError : <></>}
      <button type="submit" className="form-submit">Register</button>      
    </form>
  );
}
