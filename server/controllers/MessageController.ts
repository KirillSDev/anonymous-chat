import socket from 'socket.io';
import Message from '../model/Message';
import User from '../model/User';
import express from 'express';
import { IMessage } from '../interfaces/IMessage.interface';

export class MessageController {
    io: socket.Server;
    constructor(io: socket.Server) {
        this.io = io;
    }

    async create(data: { sender_id: string; subject: string; message: string; receiversName: string }) {
        const { sender_id, subject, message, receiversName } = data;
        const dateMessage = await new Date();
        const sender = await User.findOne({
            where: { id: sender_id },
            attributes: ['name'],
        });
        for (let receiverName of receiversName) {
            let receiver = await User.findOne({
                where: {
                    name: receiverName,
                },
            });
            if (!receiver) {
                receiver = await User.create({
                    name: receiverName,
                });
            }
            const newMessage = await Message.create({
                message: message,
                subject: subject,
                sender_id: sender_id,
                receiver_id: receiver.id,
                date: dateMessage,
            });
            this.io.to(receiver.id).emit('newMessage', {
                sender,
                ...newMessage.dataValues,
            });
        }
    }

    async getAllMessages(userId: string) {
        const messages = await Message.findAll({
            where: { receiver_id: userId },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['name'],
                },
            ],
        });
        return messages;
    }
}
