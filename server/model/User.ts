import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

import { v4 as uuidv4 } from 'uuid';
import { IUser } from 'server/interfaces/IUser.interface';
import Message from './Message';

interface IUserModel extends Optional<IUser, 'id'> {}
interface IUserInstance extends Model<IUser, IUserModel>, IUser {}

const User = sequelize.define<IUserInstance>('User', {
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: false,
    },
});

export default User;
