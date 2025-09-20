import env from '@ltv/env'
import * as dotenv from 'dotenv'
dotenv.config(); 
export const config = {
  port: env.int('PORT', 6001),
  db: {
    host: env('DB_HOST', '125.212.203.57'),
    port: env.int('DB_PORT', 13308),
    username: env('DB_USERNAME', 'root'),
    password: env('DB_PASSWORD', 'aiavn@123'),
    database: env('DB_NAME', 'firework'),
  },
  jwt: {
    secret: env('JWT_SECRET', 'thong tin bao mat du an firework z21'),
    expiresIn: env('JWT_EXPIRES_IN', '24h'),
  }
}; 