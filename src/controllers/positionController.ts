import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { PositionService } from '../services/positionService';
import { Position } from '../models/position';
const cache = require('memory-cache');
@injectable()
export class PositionController {
  constructor(private positionService: PositionService
  ) { }

  async getPositionDropdown(req: Request, res: Response): Promise<void> {
    try {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const key = 'ListPosition';
      const cachedData = cache.get(key);
      if (cachedData) {
        res.json(cachedData);
      } else {
        const data = await this.positionService.getPositionDropdown();
        if (data && data.length > 0) {
          cache.put(key, data, oneDayInMilliseconds);
          res.json(data);
        } else {
          res.json({ message: 'Không lấy được danh sách.', success: true });
        }
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async getPositionById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const position = await this.positionService.getPositionById(id);
      if (position) {
        res.json(position);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }


  async createPosition(req: Request, res: Response): Promise<void> {
    try {
      const position = req.body as Position;
      const results = await this.positionService.createPosition(position);
      cache.del('ListPosition');
      res.json({ message: 'Đã thêm thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updatePosition(req: Request, res: Response): Promise<void> {
    try {
      const position = req.body as Position;
      const results = await this.positionService.updatePosition(position);
      cache.del('ListPosition');
      res.json({ message: 'Đã cập nhật thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deletePosition(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any, updated_by_id: string };
      const results = await this.positionService.deletePosition(object.list_json, object.updated_by_id);
      cache.del('ListPosition');
      res.json({ message: 'Đã xóa thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async searchPosition(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { pageIndex: number, pageSize: number, search_content: string, position_id: string, position_name: string, description: string };
      const data: any = await this.positionService.searchPosition(object.pageIndex, object.pageSize, object.search_content, object.position_name, object.position_name, object.description);
      if (data) {
        res.json({
          totalItems: Math.ceil(data && data.length > 0 ? data[0].RecordCount : 0),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil((data && data.length > 0 ? data[0].RecordCount : 0) / (object.pageSize ? object.pageSize : 1))
        });
      } else {
        res.json({ message: 'Không tồn tại kết quả tìm kiếm.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }
}
