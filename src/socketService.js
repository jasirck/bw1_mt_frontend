// frontend/src/api/socketService.js
import io from 'socket.io-client';

let socket;

export const connectSocket = (roomId) => {
  socket = io('http://localhost:8000', {
    path: '/ws/socket.io',
    transports: ['websocket'],
  });
  
  socket.emit('join', { roomId });
  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const getSocket = () => socket;