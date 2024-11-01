import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { Input, Spin } from 'antd';
import api from '../../configs/api';
import SocketService from '../../services/socket';
import styles from './index.module.scss';
import useUserStore from '../../configs/useUserStore';
import AutoCompleteComponent from '../../components/AutoComplete';

const { TextArea } = Input;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currChat, setCurrChat] = useState({ receiverName: null, receiverId: null });
  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isEndMessage, setIsEndMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const messagesEndRef = useRef(null);
  const { user } = useUserStore();
  const avtSrc = '/src/assets/avt.jpg';

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/admin-manager/users/getAll');
        setContacts(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchContacts();
  }, []);

  // Fetch messages
  const fetchMessages = async (newPage) => {
    setLoading(true);
    try {
      const res = await api.get('/chat/messages', {
        params: {
          receiverId: currChat.receiverId,
          page: newPage,
        },
      });

      if (newPage === res.data.totalPages) {
        setIsEndMessage(true);
      } else {
        const content = res.data.content;
        setMessages((prevMessages) => [...content, ...prevMessages]);
        setPage(newPage);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch first page messages when chat changes
  useEffect(() => {
    if (currChat.receiverId) {
      fetchMessages(0);
    }
  }, [currChat]);

  // Connect to WebSocket
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (currChat?.receiverId && user?.token) {
      SocketService.connect(user.token, user.userId, currChat.receiverId, receiveMessage);
    }

    return () => {
      SocketService.disconnect();
    };
  }, [currChat, user]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      await api.post('/chat', {
        receiverId: currChat.receiverId,
        message: messageInput,
      });
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Load previous messages when scrolling up
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && !isEndMessage) {
      fetchMessages(page + 1); // Fetch the next page
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.contactList}>
        <div className={styles.search}>
          <AutoCompleteComponent
            contacts={contacts}
            currChat={currChat}
            setCurrChat={setCurrChat}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={styles.contactItem}
              onClick={() => setCurrChat({ receiverName: contact.fullName, receiverId: contact.id })}
            >
              <img src={avtSrc} className={styles.contactAvatar} alt="Avatar" />
              <div>
                <h4>{contact.fullName}</h4>
                <span>{contact.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.chatSection}>
        <div className={styles.currentChatHeader}>
          {currChat.receiverId && <img src={avtSrc} className={styles.avatar} alt="Avatar" />}
          <h3>{currChat.receiverName}</h3>
        </div>

        <ul className={styles.messageList} onScroll={handleScroll}>
          {loading && <Spin className={styles.loadingSpinner} />}
          {messages.map((message, index) => (
            <li
              key={index}
              className={`${styles.message} ${
                message.senderId === user.userId ? styles.myMessage : styles.otherMessage
              }`}
            >
              {message.senderId !== user.userId && <img src={avtSrc} className={styles.avatar} alt="Avatar" />}
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{message.message}</div>
                <span className={styles.messageTime}>{new Date(message.datetime).toLocaleTimeString()}</span>
              </div>
              {message.senderId === user.userId && <img src={avtSrc} className={styles.avatar} alt="Avatar" />}
            </li>
          ))}
          <div ref={messagesEndRef} />
          <button
            className={styles.scrollIcon}
            onClick={() => messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })}
          >
            <FontAwesomeIcon icon={faAnglesDown} />
          </button>
        </ul>

        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <TextArea
              placeholder="Enter text here..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
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
