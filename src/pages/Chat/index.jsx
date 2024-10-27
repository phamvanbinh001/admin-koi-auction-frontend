import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import styles from './index.module.scss';
import avt from '../../assets/avt.jpg';

// Kết nối đến server Socket.io
const socket = io('http://localhost:4000');

const { TextArea } = Input;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesResponse, contactsResponse] = await Promise.all([
          fetch('http://localhost:4000/messages'),
          fetch('http://localhost:4000/contacts'),
        ]);

        const messagesData = await messagesResponse.json();
        const contactsData = await contactsResponse.json();

        setMessages(messagesData);
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              <img src={contact.avatar} className={styles.contactAvatar} />
              <div>
                <h4>{contact.name}</h4>
                <span>online 1 mins ago</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.chatSection}>
        <div className={styles.currentChatHeader}>
          <h3>Aiden Chavez</h3>
          <span>Online</span>
        </div>
        <ul className={styles.messageList}>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${styles.message} ${message.from === 'me' ? styles.myMessage : styles.otherMessage}`}
            >
              {message.from === 'other' && <img src={avt} alt="avatar" className={styles.avatar} />}
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{message.text}</div>
                <span className={styles.messageTime}>{message.time}</span>
              </div>
              {message.from === 'me' && <img src={avt} alt="avatar" className={styles.avatar} />}
            </li>
          ))}
          {/* Thêm ref vào một div để cuộn tới */}
          <div ref={messagesEndRef} />
        </ul>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <TextArea
              placeholder="Enter text here..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyUp={handleKeyPress}
              rows={3}
              autoSize={{ minRows: 1, maxRows: 5 }}
            />
          </div>
          <FontAwesomeIcon icon={faPaperPlane} onClick={handleSendMessage} className={styles.sendIcon} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
