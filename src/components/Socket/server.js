const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Tạo ứng dụng Express
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // React app URL
        methods: ["GET", "POST"],
    },
});

// Lắng nghe sự kiện kết nối
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Lắng nghe sự kiện 'send_message' từ client
    socket.on('send_message', (message) => {
        // Chỉ gửi tin nhắn tới người nhận xác định (message.recipient)
        socket.to(message.recipient).emit('receive_message', message);
    });

    // Tham gia vào một "phòng" dựa trên userId
    socket.on('join_room', (userId) => {
        socket.join(userId); // Mỗi user có một "phòng" riêng để nhận tin nhắn
    });

    // Ngắt kết nối
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Khởi động server
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
