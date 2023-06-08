import { io } from 'socket.io-client';

const socket = io(process.env.SOCKET_SERVER_URL!, {
    autoConnect: false,
});

export default socket;
