import { dbConfig } from '../config/db-config';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(dbConfig.DATABASE!, dbConfig.USER!, dbConfig.PASSWORD!, {
    host: dbConfig.HOST,
    dialect: 'mysql',
});
