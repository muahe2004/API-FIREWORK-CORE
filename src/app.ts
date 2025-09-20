import express, { Application, NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import mysql from 'mysql2';
import { errorHandler } from './errors/errorHandler';
import router from "./routes/index"; 
import cors from 'cors';
import core_router from './core/routes';
const app  = express(); 
 // Sử dụng cors middleware  
app.use(cors());
// Middleware để xử lý dữ liệu đầu vào
app.use(express.json()); // Middleware để xử lý dữ liệu JSON
app.use(express.urlencoded({ extended: true })); // Middleware để xử lý dữ liệu được gửi qua form-urlencoded
// Sử dụng router 
app.use('/api-core', core_router);
app.use('/api-core', router);
// Đăng ký middleware xử lý lỗi toàn cục
app.use(errorHandler);
// Middleware tùy chỉnh để xử lý dữ liệu đầu vào
app.use((req: Request, res: Response, next: NextFunction) => {
  // Xử lý dữ liệu đầu vào của request trước khi tiếp tục xử lý
  req.body = escapeRequestBody(req.body);
  next();
});
// Hàm tùy chỉnh để escape dữ liệu đầu vào
function escapeRequestBody(data: any): any {
  // Xử lý và escape dữ liệu theo ý muốn của bạn
  // Ví dụ: sử dụng mysql.escape để escape dữ liệu
  if (typeof data === 'object') {
    for (let key in data) {
      if (typeof data[key] === 'string') {
        data[key] = mysql.escape(data[key]);
      }
    }
  }
  return data;
}
// Xử lý các route không tồn tại
app.use((req , res ) => {
  res.json({ message: 'Không tìm thấy đường dẫn' });
});
export default app;
 