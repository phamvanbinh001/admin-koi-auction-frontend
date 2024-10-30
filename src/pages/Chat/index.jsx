import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { Input, Spin, AutoComplete } from 'antd';
import api from '../../configs/api';
import SocketService from '../../services/socket';
import styles from './index.module.scss';
import useUserStore from '../../configs/useUserStore';

const { TextArea } = Input;

const Chat = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');

  const [messages, setMessages] = useState([]);
  const [currChat, setCurrChat] = useState({ receiverName: 'Vincent Porter', receiverId: id });
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false); // State cho Spin loading
  const [searchValue, setSearchValue] = useState(''); // Khởi tạo searchValue
  const [hasMorePages, setHasMorePages] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useUserStore();

  // Fake contacts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/contacts');
        const contactsData = await res.json();
        setContacts(contactsData);
      } catch (error) {}
    };

    fetchData();
  }, []);

  // Connect to WebSocket
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log('Received message:', message);
    };

    if (currChat?.receiverId && user?.token) {
      SocketService.connect(user.token, user.userId, currChat.receiverId, receiveMessage);
    }

    return () => {
      SocketService.disconnect();
    };
  }, [currChat, user]);

  // Tạo danh sách các tùy chọn gợi ý cho AutoComplete
  const options = contacts
    .filter((contact) => contact.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((contact) => ({
      value: contact.name,
      label: (
        <div className={styles.contactItem}>
          <img src="" alt="avatar" className={styles.contactAvatar} />
          <span>{contact.name}</span>
        </div>
      ),
    }));

  const fetchOlderMessages = useCallback(async () => {
    if (isFetching || !hasMorePages || currentPage <= 1) return;

    setIsFetching(true);
    setIsFetchingMessages(true); // Hiển thị Spin

    try {
      const res = await api.get('/chat/messages', {
        params: {
          receiverId: 1,
          page: currentPage - 1,
        },
      });

      const data = res.data;

      if (res.status === 200) {
        const formattedMessages = data.content.map((message) => {
          const dateObj = new Date(message.datetime);
          return {
            ...message,
            date: dateObj.toLocaleDateString('en-GB'),
            time: dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          };
        });

        setMessages((prevMessages) => [...formattedMessages, ...prevMessages]);
        setCurrentPage((prevPage) => prevPage - 1);

        if (data.first) {
          setHasMorePages(false);
        }
      } else {
        console.error('Error fetching older messages:', data);
      }
    } catch (error) {
      console.error('Error fetching older messages:', error);
    } finally {
      setIsFetching(false);
      setIsFetchingMessages(false); // Tắt Spin
    }
  }, [currentPage, isFetching, hasMorePages]);

  useEffect(() => {
    const fetchLatestMessages = async () => {
      setIsFetching(true);
      setIsFetchingMessages(true); // Hiển thị Spin khi tải tin nhắn mới nhất

      try {
        const initialRes = await api.get('/chat/messages', {
          params: {
            receiverId: 1,
            page: 0,
          },
        });

        const initialData = initialRes.data;

        if (initialRes.status === 200) {
          const latestPage = initialData.totalPages - 1;

          const latestMessagesRes = await api.get('/chat/messages', {
            params: {
              receiverId: 1,
              // page: latestPage,
              page: 0,
            },
          });

          const latestMessagesData = await latestMessagesRes.data;

          if (latestMessagesRes.ok) {
            const formattedMessages = latestMessagesData.content.map((message) => {
              const dateObj = new Date(message.datetime);
              return {
                ...message,
                date: dateObj.toLocaleDateString('en-GB'),
                time: dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
              };
            });

            setMessages(formattedMessages);
            setCurrentPage(latestPage);
            setHasMorePages(!latestMessagesData.first);
          }
        }
      } catch (error) {
        console.error('Error fetching latest messages:', error);
      } finally {
        setIsFetching(false);
        setIsFetchingMessages(false); // Tắt Spin
      }
    };

    fetchLatestMessages();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      receiverId: currChat.receiverId,
      message: messageInput,
      senderId: user.userId,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const sendMessage = async () => {
      try {
        const res = await api.post(
          '/chat',
          {
            receiverId: currChat.receiverId,
            message: messageInput,
          },
          { requireAuth: true },
        );
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
    sendMessage();
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInput('');
    setShouldScrollToBottom(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        fetchOlderMessages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchOlderMessages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.contactList}>
        <div className={styles.search}>
          <AutoComplete
            options={options}
            style={{ width: '100%' }}
            placeholder="Search..."
            onSelect={(value) => (currChat.receiverName = value)} // Xử lý khi chọn một gợi ý
            onSearch={(value) => setSearchValue(value)} // Cập nhật giá trị tìm kiếm
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
          />
        </div>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={styles.contactItem}
              onClick={() => {
                console.log(`Clicked on : ID=${contact.id}, Name=${contact.name}`);
                setCurrChat({ receiverName: contact.name, receiverId: contact.id });
              }}
            >
              <img src="" className={styles.contactAvatar} alt="avt" />
              <div>
                <h4>{contact.name}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.chatSection}>
        <div className={styles.currentChatHeader}>
          <h3>{currChat.receiverName}</h3>
        </div>

        {/* Hiển thị Spin khi đang tải tin nhắn */}
        {isFetchingMessages ? (
          <Spin fullscreen />
        ) : (
          <ul className={styles.messageList}>
            {messages.map((message, index) => (
              <li
                key={index}
                className={`${styles.message} ${
                  message.senderId === user.userId ? styles.myMessage : styles.otherMessage
                }`}
              >
                {message.senderId !== user.userId && <img src="" alt="avt" className={styles.avatar} />}
                <div className={styles.messageContent}>
                  <div className={styles.messageText}>{message.message}</div>
                  <span className={styles.messageTime}>{message.time}</span>
                </div>
                {message.senderId === user.userId && <img src="" alt="avt" className={styles.avatar} />}
              </li>
            ))}
            <div ref={messagesEndRef} />
            <button className={styles.scrollIcon} onClick={() => setShouldScrollToBottom(true)}>
              <FontAwesomeIcon icon={faAnglesDown} />
            </button>
          </ul>
        )}

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
