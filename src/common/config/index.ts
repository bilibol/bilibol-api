import { config } from 'dotenv';
import { cleanEnv, num, str } from 'envalid';
config();

export const env = cleanEnv(process.env, {
  // Server
  PORT: num(),

  // Database
  MONGO_URI: str(),

  // Redis
  REDIS_HOST: str(),
  REDIS_PORT: num(),

  // JWT
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_EXPIRY: str(),
  JWT_REFRESH_EXPIRY: str(),
});
