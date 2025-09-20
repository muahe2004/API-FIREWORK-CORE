import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { BranchService } from '../services/branchService';
import { Branch } from '../models/branch';
const cache = require('memory-cache');
@injectable()
export class BranchController {
  constructor(private branchService: BranchService
  ) { }

  async getBranchDropdown(req: Request, res: Response): Promise<void> {
    try {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const key = 'ListBranch';
      const cachedData = cache.get(key);
      if (cachedData) {
        res.json(cachedData);
      } else {
        const data = await this.branchService.getBranchDropdown();
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

  async getBranchById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const branch = await this.branchService.getBranchById(id);
      if (branch) {
        res.json(branch);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }


  async createBranch(req: Request, res: Response): Promise<void> {
    try {
      const branch = req.body as Branch;
      const results = await this.branchService.createBranch(branch);
      cache.del('ListBranch');
      res.json({ message: 'Đã thêm thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateBranch(req: Request, res: Response): Promise<void> {
    try {
      const branch = req.body as Branch;
      const results = await this.branchService.updateBranch(branch);
      cache.del('ListBranch');
      res.json({ message: 'Đã cập nhật thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteBranch(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any, updated_by_id: string };
      const results = await this.branchService.deleteBranch(object.list_json, object.updated_by_id);
      cache.del('ListBranch');
      res.json({ message: 'Đã xóa thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false }); 
    }
  }

  async searchBranch(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { pageIndex: number, pageSize: number, search_content: string, branch_name: string, phone: string, fax: string, address: string };
      const data: any = await this.branchService.searchBranch(object.pageIndex, object.pageSize, object.search_content, object.branch_name, object.phone, object.fax, object.address);
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