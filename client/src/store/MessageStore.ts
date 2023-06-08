import { IMessage } from '@interfaces/IMessage.interface';
import { makeAutoObservable } from 'mobx';
import socket from '@sockets/socket';
class MessageStore {
    isAuthenticated = false;
    messages: IMessage[] = [];
    newMessageStatus = false;
    constructor() {
        makeAutoObservable(this);
    }
    getAllMessages() {
        socket.on('messages', (data) => {
            console.log(data);
            this.messages = data;
        });
    }
    getNewMessage() {
        socket.on('newMessage', (data) => {
            this.messages.push(data);
            this.newMessageStatus = true;
        });
    }
    changeStatusMessage(status: boolean) {
        this.newMessageStatus = status;
    }
}

const messageStore = new MessageStore();
export default messageStore;
