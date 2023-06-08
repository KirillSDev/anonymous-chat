import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { sequelize } from './database';
import bodyParser from 'body-parser';

import { UserController } from './controllers/UserController';
import { MessageController } from './controllers/MessageController';
import { createSocketServer } from './core/socket';
import path from 'path';
const app = express();
const port = process.env.PORT || 3000;

const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));
app.use(cors());
app.use(bodyParser.json());

const httpServer = createServer(app);
const io = createSocketServer(httpServer);

const User = new UserController(io);
const Message = new MessageController(io);

io.use(async (socket: any, next) => {
    const name = socket.handshake.auth.name;
    if (!name) {
        return next(new Error('invalid name'));
    }
    console.log(name);
    const user = await User.create(name);
    socket.id = user.dataValues.id;
    next();
});
io.on('connection', async (socket: any) => {
    const users = await User.showAllUsers();
    socket.emit('users', { users, userId: socket.id });
    const messages = await Message.getAllMessages(socket.id);
    socket.emit('messages', messages);
    socket.on('sendMessage', async (data: any) => {
        await Message.create({
            message: data.message,
            subject: data.subject,
            sender_id: data.sender_id,
            receiversName: data.receiversName,
        });
    });
});

app.get('*', (req, res, next) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});
sequelize
    .sync()
    .then(() => {
        console.log('Connected to the database');
        httpServer.listen(port, () => {
            console.log('Server start');
        });
    })
    .catch((error: Error) => {
        console.error('Failed to connect to the database:', error);
    });
