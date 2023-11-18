import { config } from 'dotenv';
import { bool, cleanEnv, num, str } from 'envalid';
config();

export const env = cleanEnv(process.env, {
  // Server
  PORT: num(),

  // Database
  DB_HOST: str(),
  DB_PORT: num(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  DB_SYNC: bool(),

  // Redis
  REDIS_HOST: str(),
  REDIS_PORT: num(),

  // JWT
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_EXPIRY: str(),
  JWT_REFRESH_EXPIRY: str(),
});
