import dotenv from 'dotenv'

dotenv.config()

export default {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.PORT || 'development',

  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'admin',
  DB_PASSWORD: process.env.DB_PASSWORD || 'admin123',
  DB_NAME: process.env.DB_NAME || 'tiktokdb',
  DB_PORT: process.env.PORT || 3306
}
