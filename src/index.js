import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const CHATS = [
    { msg: 'Hi', sender: 0 },
    { msg: 'Hi, there', sender: 1 },
    { msg: 'Have you seen the UI for the chat window that I have built?', sender: 0 },
    { msg: 'Yes it looks cool', sender: 1 },
    { msg: 'You must add more features to it', sender: 1}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App chats={CHATS}/>
);
