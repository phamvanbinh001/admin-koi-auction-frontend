import React, { useEffect, useState } from 'react';
import { Button, Input, List, Typography } from 'antd';
import io from 'socket.io-client';

const { TextArea } = Input;
const { Title } = Typography;

// Kết nối đến WebSocket server
// const socket = io('http://localhost:4000');

const Chat = ({ userId, recipientId }) => {
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');
  // // Lắng nghe tin nhắn mới từ server
  // useEffect(() => {
  //   socket.on('receive_message', (message) => {
  //     // Chỉ hiển thị tin nhắn giữa userId và recipientId
  //     if (
  //       (message.sender === userId && message.recipient === recipientId) ||
  //       (message.sender === recipientId && message.recipient === userId)
  //     ) {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     }
  //   });
  //   return () => {
  //     socket.off('receive_message');
  //   };
  // }, [userId, recipientId]);
  // // Gửi tin nhắn
  // const sendMessage = () => {
  //   if (newMessage) {
  //     const message = {
  //       sender: userId, // Người gửi là user hiện tại
  //       recipient: recipientId, // Người nhận là người kia
  //       content: newMessage,
  //       time: new Date(),
  //     };
  //     // Gửi tin nhắn lên server
  //     socket.emit('send_message', message);
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //     setNewMessage(''); // Xóa khung nhập sau khi gửi
  //   }
  // };
  // return (
  //   <div style={{ padding: 20 }}>
  //     <Title level={3}>Private Chat with User {recipientId}</Title>
  //     {/* Danh sách tin nhắn */}
  //     <List
  //       bordered
  //       dataSource={messages}
  //       renderItem={(item) => (
  //         <List.Item>
  //           <List.Item.Meta
  //             title={`From: ${item.sender === userId ? 'You' : 'User ' + recipientId}`}
  //             description={item.content}
  //           />
  //         </List.Item>
  //       )}
  //       style={{ marginBottom: 20, height: '50vh', overflowY: 'auto' }}
  //     />
  //     {/* Khung nhập liệu */}
  //     <TextArea
  //       rows={2}
  //       value={newMessage}
  //       onChange={(e) => setNewMessage(e.target.value)}
  //       placeholder="Type a message..."
  //       style={{ marginBottom: 10 }}
  //     />
  //     {/* Nút gửi tin nhắn */}
  //     <Button type="primary" onClick={sendMessage}>
  //       Send Message
  //     </Button>
  //   </div>
  // );
};

export default Chat;
