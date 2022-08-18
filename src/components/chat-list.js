import { useState } from 'react';
import Search from './search-users'
import './styles/styles.css';

function ChatList(props) {
  const receivers = props.users.filter(u=>u.name !== props.sender.name);
  const [users, setUsers] = useState(
    receivers.map((el) => (
      <input type="button" onClick={onClick} value={el.name} className="item" />
    ))
  );

  function onClick(e) {
    e.preventDefault();
    const receiver = receivers.filter(u => u.name === e.target.value);
    console.log(e.target.value);
    props.setReceiver(receiver[0]);
  }

  function handleSearchChange(e) {
    e.preventDefault();
    const name = e.target.value;
    const tempItems = receivers.filter(item => item.name.toLowerCase().includes(name.replace(' ','').toLowerCase()));
    const tempUsers = tempItems.map((el) => (
      <input type='button' onClick={onClick} value={el.name} className="item" />
    ));
    setUsers(tempUsers);
  }
  return (
    <div className='left-pane'>
      <Search handleSearchChange={handleSearchChange} />
      <div className="list scrollable">{users}</div>
    </div>
  );
}

export default ChatList;