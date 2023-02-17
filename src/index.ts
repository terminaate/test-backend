import dotenv from 'dotenv';
import express from 'express';
import { apiRouter } from './routers/apiRouter';
import cookieParser from 'cookie-parser';
import { bodyExceptionMiddleware } from './middlewares/body-exception.middleware';
import cors from 'cors';
import { validateEnvVariables } from './utils/validateEnvVariables';
import { db } from '@/db';
import { setupStaticDir } from '@/utils/setupStaticDir';
import path from 'path';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });
validateEnvVariables();
setupStaticDir();

async function bootstrap() {
	const app = express();

	const { PORT, CLIENT_URL, COOKIE_SECRET } = process.env;
	try {
		await db.authenticate();
		await db.sync({ alter: true });
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}

	app.use(
		cors({
			credentials: true,
			origin: CLIENT_URL,
		})
	);
	app.use(express.json({ limit: '10mb' }));
	app.use('/static', express.static(path.resolve(__dirname, './static')));
	app.use('/api', apiRouter);
	app.use(cookieParser(COOKIE_SECRET));
	app.use(bodyExceptionMiddleware);

	await app.listen(PORT, () =>
		console.log('Server listening on http://127.0.0.1:' + PORT)
	);
}

void bootstrap();
