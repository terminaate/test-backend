type Class<T = any> = { new (): T };

namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		DB_HOST: string;
		DB_PORT: string;
		DB_USERNAME: string;
		DB_PASSWORD: string;
		DB_NAME: string;
		JWT_ACCESS_SECRET: string;
		JWT_REFRESH_SECRET: string;
		COOKIE_SECRET: string;
		CLIENT_URL: string;
	}
}