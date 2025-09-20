import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { RoleService } from '../services/roleService';
import { Role } from '../models/role';

@injectable()
export class RoleController {
  constructor(private roleService: RoleService
  ) { }

  async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const role = await this.roleService.getRoleById(id);
      if (role) {
        res.json(role);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async getRoleByUserId(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const role = await this.roleService.getRoleByUserId(id);
      if (role) {
        res.json(role);
      } else {
        res.json({ message: 'Bản ghi không tồn tại.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }


  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as Role;
      const results = await this.roleService.createRole(role);
      res.json({ message: 'Đã thêm thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as Role;
      const results = await this.roleService.updateRole(role);
      res.json({ message: 'Đã cập nhật thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any, updated_by_id: string };
      const results = await this.roleService.deleteRole(object.list_json, object.updated_by_id);
      res.json({ message: 'Đã xóa thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async searchRole(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { pageIndex: number, pageSize: number, search_content: string, role_id: string, role_code: string, role_name: string, description: string };
      const data: any = await this.roleService.searchRole(object.pageIndex,
        object.pageSize,
        object.search_content,
        object.role_id,
        object.role_code,
        object.role_name,
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
