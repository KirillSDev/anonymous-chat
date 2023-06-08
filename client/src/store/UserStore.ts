import { IUser } from '@interfaces/IUser.interface';
import { makeAutoObservable } from 'mobx';
import socket from '@sockets/socket';
class UserStore {
    isAuthenticated = false;
    userId: string = '';
    users: Omit<IUser, 'id'>[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    getAllUsers() {
        socket.on('users', (data) => {
            this.users = data.users;
            this.userId = data.userId;
        });
    }
}

const userStore = new UserStore();
export default userStore;
