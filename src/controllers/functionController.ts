import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { FunctionService } from '../services/functionService';
import { FunctionModel } from '../models/function';

@injectable()
export class FunctionController {
  constructor(private funcService: FunctionService
  ) { }


  async getFunctionById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const customer = await this.funcService.getFunctionById(id);
      if (customer) {
        res.json(customer);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }


  async createFUnction(req: Request, res: Response): Promise<void> {
    try {
      const func = req.body as FunctionModel;
      const results = await this.funcService.createFunction(func);
      res.json({ message: 'Đã thêm thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateFunction(req: Request, res: Response): Promise<void> {
    try {
      const func = req.body as FunctionModel;
      const results = await this.funcService.updateFunction(func);
      res.json({ message: 'Đã cập nhật thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteFunction(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any, updated_by_id: string };
      const results = await this.funcService.deleteFunction(object.list_json, object.updated_by_id);
      res.json({ message: 'Đã xóa thành công', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async searchFunction(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as { pageIndex: number, pageSize: number, search_content: string, function_id: string, parent_id: string, function_name: string, url: string, description: string, level: number };
      const data: any = await this.funcService.searchFunction(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.function_id,
        object.parent_id,
        object.function_name,
        object.url,
        object.description,
        object.level);
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

  async getByRole(req: Request, res: Response): Promise<any> {
    try {
      const role_id = req.params.id;
      const data: any = await this.funcService.getFunctionByRole(role_id);
      if (data) {
        res.json(data);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

}
