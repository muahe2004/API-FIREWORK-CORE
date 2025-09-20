import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { UserRole } from '../models/userRoles';
import { UserRoleService } from '../services/userRoleService';
@injectable()
export class UserRoleController {
  constructor(private rfService: UserRoleService
  ) { }

  async createUserRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as { user_role_list: any, created_by_user_id: string }
      const results = await this.rfService.createUserRole(role.user_role_list, role.created_by_user_id);
      res.json({ message: 'Đã thêm thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteUserRole(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any, updated_by_id: string };
      const results = await this.rfService.deleteUserRole(object.list_json, object.updated_by_id);
      res.json({ message: 'Đã xóa thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async getUserRole(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.params.userid;
      const role_id = req.params.roleid;
      const data: any = await this.rfService.getUserRole(user_id, role_id);
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