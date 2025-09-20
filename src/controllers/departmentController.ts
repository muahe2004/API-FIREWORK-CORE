import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { DepartmentService } from '../services/departmentService';
import { Department } from '../models/department';
const cache = require('memory-cache');
@injectable()
export class DepartmentController {
  constructor(private departmentService: DepartmentService
  ) { }

  async getDepartmentDropdown(req: Request, res: Response): Promise<void> {
    try {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const key = 'ListDepartment';
      const cachedData = cache.get(key);
      if (cachedData) {
        res.json(cachedData);
      } else {
        const data = await this.departmentService.getDepartmentDropdown();
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

  async getDepartmentById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const department = await this.departmentService.getDepartmentById(id);
      if (department) {
        res.json(department);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }


  async createDepartment(req: Request, res: Response): Promise<void> {
    try {
      const department = req.body as Department;
      const results = await this.departmentService.createDepartment(department);
      cache.del('ListDepartment');
      res.json({ message: 'Đã thêm thành công', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateDepartment(req: Request, res: Response): Promise<void> {
    try {
      const department = req.body as Department;
      const results = await this.departmentService.updateDepartment(department);
      cache.del('ListDepartment');
      res.json({ message: 'Đã cập nhật thành công', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteDepartment(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any, updated_by_id: string };
      const results = await this.departmentService.deleteDepartment(object.list_json, object.updated_by_id);
      cache.del('ListDepartment');
      res.json({ message: 'Đã xóa thành công', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async searchDepartment(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { pageIndex: number, pageSize: number, search_content: string, department_id: number, department_name: string, phone: string, fax: string, address: string };
      const data: any = await this.departmentService.searchDepartment(object.pageIndex, object.pageSize, object.search_content, object.department_id, object.department_name, object.phone, object.fax, object.address);
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
