import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { validateEnvVariables } from '@/utils/validateEnvVariables';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });
validateEnvVariables();

export const db = new Sequelize({
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	dialect: 'mysql',
});
