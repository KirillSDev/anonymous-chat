import { Server } from 'socket.io';
import http from 'http';

export const createSocketServer = (httpServer: http.Server) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    return io;
};
