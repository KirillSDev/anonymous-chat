import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { IMessage } from '../interfaces/IMessage.interface';
import User from './User';

interface IMessageModel extends Optional<IMessage, 'id'> {}
interface IMessageInstance extends Model<IMessage, IMessageModel>, IMessage {}

const Message = sequelize.define<IMessageInstance>('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING,
    },
    subject: {
        type: DataTypes.STRING,
    },
    sender_id: {
        type: DataTypes.STRING,
    },
    receiver_id: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
    },
});

Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

export default Message;
