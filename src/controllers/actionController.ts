import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { ActionService } from '../services/actionService';
import { Action } from '../models/action';

@injectable()
export class ActionController {
  constructor(private actionService: ActionService
  ) { }


  async getActionById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const action = await this.actionService.getActionById(id);
      if (action) {
        res.json(action);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }


  async createAction(req: Request, res: Response): Promise<void> {
    try {
      const action = req.body as Action;
      const results = await this.actionService.createAction(action);
      res.json({ message: 'Đã thêm thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateAction(req: Request, res: Response): Promise<void> {
    try {
      const action = req.body as Action;
      const results = await this.actionService.updateAction(action);
      res.json({ message: 'Đã cập nhật thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteAction(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any, updated_by_id: string };
      const results = await this.actionService.deleteAction(object.list_json, object.updated_by_id);
      res.json({ message: 'Đã xóa thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async searchAction(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { pageIndex: number, pageSize: number, search_content: string, function_id: string, action_code: string, action_name: string, description: string };
      const data: any = await this.actionService.searchAction(object.pageIndex,
        object.pageSize,
        object.search_content,
        object.function_id,
        object.action_code,
        object.action_name,
        object.description);
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
