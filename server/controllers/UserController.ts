import express from 'express';
import socket from 'socket.io';
import User from '../model/User';

export class UserController {
    io: socket.Server;
    constructor(io: socket.Server) {
        this.io = io;
    }
    async create(name: string) {
        let user = await User.findOne({ where: { name } });
        if (!user) {
            user = await User.create({
                name,
            });
        }
        return user;
    }
    async showAllUsers() {
        const users = await User.findAll({
            attributes: ['name'],
        });
        return users;
    }
}
