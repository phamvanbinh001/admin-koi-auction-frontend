import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// function connectWebSocket() {
//     if (stompClient && stompClient.connected) {
//         return; // Prevent multiple connections
//     }
//     const socket = new SockJS('http://localhost:8080/ws');
//     stompClient = Stomp.over(socket);

//     stompClient.connect({ Authorization: 'Bearer ' + jwtToken }, function (frame) {
//         console.log('Connected to WebSocket: ' + frame);

//         // Subscribe to chat messages for the specific receiver in the room-4-5 channel
//         stompClient.subscribe(`/topic/room-4-5`, function (message) {
//             const chatMessage = JSON.parse(message.body);
//             displayChatMessage(chatMessage);
//         });
//     });
// }

class SocketService {
    constructor() {
        this.stompClient = null;
    }

    connect(token, senderId, receiverId, displayChatMessage) {
        const socketURL = import.meta.env.VITE_SOCKET_URL;
        const socket = new SockJS(socketURL);
        this.stompClient = Stomp.over(socket);
        const self = this; // Lưu giá trị `this`

        this.stompClient.connect({ Authorization: 'Bearer ' + token }, function (frame) {
            console.log('Connected to WebSocket: ' + frame);
            console.log(token);

            const chatRoom = senderId < receiverId ? `${senderId}-${receiverId}` : `${receiverId}-${senderId}`;
            console.log('chatRoom', chatRoom);

            self.stompClient.subscribe(`/topic/room-${chatRoom}`, function (message) {
                const chatMessage = JSON.parse(message.body);
                displayChatMessage(chatMessage);
            });
        });
    }


    sendMessage(destination, message) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        }
    }

    disconnect() {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected from WebSocket');
            });
        }
    }

}

export default new SocketService();