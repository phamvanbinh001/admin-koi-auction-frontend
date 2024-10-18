import React, { useState } from 'react';
import styles from './index.module.scss';

const Chat = () => {
  const [contacts] = useState([
    { id: 1, name: 'Vincent Porter', status: 'left 7 mins ago', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 2, name: 'Aiden Chavez', status: 'online', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 3, name: 'Mike Thomas', status: 'online', avatar: 'https://i.pravatar.cc/150?img=5' },
  ]);

  const [messages] = useState([
    { id: 1, from: 'other', text: 'Hi Aiden, how are you? How is the project coming along?', time: '10:10 AM' },
    { id: 2, from: 'me', text: 'Hi! I am good! How about you?', time: '10:12 AM' },
    { id: 3, from: 'other', text: 'Are we meeting today?', time: '10:15 AM' },
    { id: 4, from: 'me', text: 'Project has already been finished and I have results to show you.', time: '10:16 AM' },
  ]);

  return (
    <div className={styles.chatContainer}>
      {/* Danh sách liên hệ bên trái */}
      <div className={styles.contactList}>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
        </div>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
              <img src={contact.avatar} alt={contact.name} className={styles.contactAvatar} />
              <div>
                <h4>{contact.name}</h4>
                <span>{contact.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Phần tin nhắn bên phải */}
      <div className={styles.chatSection}>
        <div className={styles.currentChatHeader}>
          <h3>Aiden Chavez</h3>
          <span>Last seen: 2 hours ago</span>
        </div>
        <ul className={styles.messageList}>
          {messages.map((message) => (
            <li
              key={message.id}
              className={`${styles.message} ${message.from === 'me' ? styles.myMessage : styles.otherMessage}`}
            >
              {message.from === 'other' && (
                <img src="https://i.pravatar.cc/150?img=4" alt="avatar" className={styles.avatar} />
              )}
              <div className={styles.messageContent}>
                <span className={styles.messageTime}>{message.time}</span>
                <div className={styles.messageText}>{message.text}</div>
              </div>
              {message.from === 'me' && (
                <img src="https://i.pravatar.cc/150?img=5" alt="avatar" className={styles.avatar} />
              )}
            </li>
          ))}
        </ul>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Enter text here..." className={styles.inputField} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
