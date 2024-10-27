import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { SendOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import avt from '../../assets/avt.jpg';

// Kết nối đến server Socket.io
const socket = io('http://localhost:4000');

const Chat = () => {
  const contacts = [
    { id: 1, name: 'Vincent Porter', status: 'left 7 mins ago', avatar: avt },
    { id: 2, name: 'Aiden Chavez', status: 'online', avatar: avt },
    { id: 3, name: 'Mike Thomas', status: 'online', avatar: avt },
    { id: 4, name: 'Emily Johnson', status: 'typing...', avatar: avt },
    { id: 5, name: 'Lucas Brown', status: 'offline', avatar: avt },
    { id: 6, name: 'Sophia Davis', status: 'left 10 mins ago', avatar: avt },
    { id: 7, name: 'James Wilson', status: 'online', avatar: avt },
    { id: 8, name: 'Isabella Garcia', status: 'online', avatar: avt },
    { id: 9, name: 'Michael Martinez', status: 'left 1 hour ago', avatar: avt },
    { id: 10, name: 'Mia Anderson', status: 'online', avatar: avt },
    { id: 11, name: 'Daniel Thomas', status: 'left 5 mins ago', avatar: avt },
    { id: 12, name: 'Charlotte Rodriguez', status: 'offline', avatar: avt },
    { id: 13, name: 'Matthew Lee', status: 'online', avatar: avt },
    { id: 14, name: 'Amelia Lopez', status: 'online', avatar: avt },
    { id: 15, name: 'Benjamin Walker', status: 'typing...', avatar: avt },
  ];
  const [messages, setMessages] = useState([
    { id: 1, from: 'other', text: 'Hi Aiden, how are you?', time: '10:10 AM' },
    { id: 2, from: 'me', text: 'Hi! I am good! How about you?', time: '10:12 AM' },
    { id: 3, from: 'other', text: 'Have you finished the project we discussed?', time: '10:15 AM' },
    { id: 4, from: 'me', text: 'Yes, I just wrapped it up yesterday!', time: '10:17 AM' },
    { id: 5, from: 'other', text: 'That’s great! Can you share the results with me?', time: '10:20 AM' },
    { id: 6, from: 'me', text: 'Absolutely! I will send it over shortly.', time: '10:22 AM' },
    { id: 7, from: 'other', text: 'Perfect! Also, did you manage to talk to the client?', time: '10:25 AM' },
    {
      id: 8,
      from: 'me',
      text: 'I spoke to them last week, and they seemed happy with our progress.',
      time: '10:27 AM',
    },
    { id: 9, from: 'other', text: 'That’s a relief! What’s next on the agenda?', time: '10:30 AM' },
    { id: 10, from: 'me', text: 'We need to finalize the presentation for the next meeting.', time: '10:32 AM' },
    { id: 11, from: 'other', text: 'Got it! When is the meeting scheduled for?', time: '10:35 AM' },
    { id: 12, from: 'me', text: 'It’s on Thursday at 2 PM. Don’t forget!', time: '10:37 AM' },
    { id: 13, from: 'other', text: 'Thanks for the reminder! I’ll prepare the slides.', time: '10:40 AM' },
    { id: 14, from: 'me', text: 'Sounds good! Let’s review them together before the meeting.', time: '10:42 AM' },
    { id: 15, from: 'other', text: 'Absolutely! I’ll share my screen so we can go through them.', time: '10:45 AM' },
    { id: 16, from: 'me', text: 'Great! Looking forward to it.', time: '10:47 AM' },
    {
      id: 17,
      from: 'other',
      text: 'Me too! By the way, have you seen the latest updates from the team?',
      time: '10:50 AM',
    },
    { id: 18, from: 'me', text: 'Yes, they have made some impressive progress!', time: '10:52 AM' },
    { id: 19, from: 'other', text: 'I’m excited to see how everything comes together.', time: '10:55 AM' },
    { id: 20, from: 'me', text: 'Same here! Let’s keep each other updated.', time: '10:57 AM' },
  ]);

  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Lắng nghe tin nhắn từ server
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    // Cuộn tới tin nhắn mới nhất mỗi khi messages thay đổi
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    const newMessage = {
      from: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit('sendMessage', newMessage); // Gửi tin nhắn đến server
    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
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

      <div className={styles.chatSection}>
        <div className={styles.currentChatHeader}>
          <h3>Aiden Chavez</h3>
          <span>Last seen: 2 hours ago</span>
        </div>
        <ul className={styles.messageList}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${styles.message} ${message.from === 'me' ? styles.myMessage : styles.otherMessage}`}
            >
              {message.from === 'other' && <img src={avt} alt="avatar" className={styles.avatar} />}
              <div className={styles.messageContent}>
                <span className={styles.messageTime}>{message.time}</span>
                <div className={styles.messageText}>{message.text}</div>
              </div>
              {message.from === 'me' && <img src={avt} alt="avatar" className={styles.avatar} />}
            </li>
          ))}
          {/* Thêm ref vào một div để cuộn tới */}
          <div ref={messagesEndRef} />
        </ul>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter text here..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.inputField}
            />
            <SendOutlined onClick={handleSendMessage} className={styles.sendIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
