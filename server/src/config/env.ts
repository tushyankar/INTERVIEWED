import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
  }),

  PORT: port(),

  CLIENT_URL: str(),

  DATABASE_URL: str(),

  REDIS_URL: str(),

  JWT_SECRET: str(),

  JWT_REFRESH_SECRET: str(),

  OPENAI_API_KEY: str({
    default: '',
  }),

  CLOUDINARY_CLOUD_NAME: str({
    default: '',
  }),

  CLOUDINARY_API_KEY: str({
    default: '',
  }),

  CLOUDINARY_API_SECRET: str({
    default: '',
  }),
});

export default env;
