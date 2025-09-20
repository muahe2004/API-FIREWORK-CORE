import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { UserService } from "../services/userService";
import { User } from "../models/user";
import { generateToken } from "../config/jwt";
import { Action } from "../models/action";
@injectable()
export class UserController {
  constructor(private userService: UserService) { }

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await this.userService.authenticate(username, password);
      if (user) {
        let obj: any = {};
        obj.user_id = user.user_id,
        obj.full_name = user.full_name,
        obj.user_name = user.user_name;
        obj.role_group = user.role_group;

        let action_results = [];
        for (let row of user.actions) {
          let row_data = row as Action;
          action_results.push({ action_code: row_data.action_code, action_api_url: row_data.action_api_url });
        }
        obj.actions = action_results; 
        const token = generateToken(obj);
        user.token = token;
        res.json(user);
      } else {
        res.json({ message: "Sai mật tài khoản hoặc mật khẩu.", success: false });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async getFunctionsByUser(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.params.id;
      const data: any = await this.userService.getFunctionsByUser(user_id);
      if (data && data.length > 0) {
        let functions = data;
        if (functions) {
          res.json(functions);
        } else {
          res.json({ message: 'Bản ghi không tồn tại.', success: true });
        }
      } else {
        res.json({ message: 'Bản ghi không tồn tại', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data: any = await this.userService.getUserById(id);
      if (data && data.length > 0) {
        let user: any = data[0][0];
        if (user) {
          user.employee_customer = data[1];
          user.employee_customer_for_detail = data[2];
          res.json(user);
        } else {
          res.json({ message: 'Bản ghi không tồn tại.', success: true });
        }
      } else {
        res.json({ message: 'Bản ghi không tồn tại', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async lockUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body as User;
      const results = await this.userService.lockUser(user);
      if (user.online_flag == 1)
        res.json({ message: "Đã khóa người dùng thành công.", success: true });
      else
        res.json({ message: "Đã mở khóa người dùng thành công.", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body as User;
      const results = await this.userService.creatUser(user);
      res.json({ message: "Đã thêm thành công.", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as User;
      const results = await this.userService.updateUser(role);
      res.json({ message: "Đã cập nhật thành công.", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      const results = await this.userService.deleteUser(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công.", success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        branch_id: string;
        department_id: string;
        customer_id: string;
        user_id: string;
      };
      const data: any = await this.userService.searchUser(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.branch_id,
        object.department_id,
        object.customer_id,
        object.user_id
      );
      if (data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
            (object.pageSize ? object.pageSize : 1),
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async authorize(req: Request, res: Response): Promise<void> {
    try {
      let token = req.params.token;
      let result = await this.userService.authorize(token);
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "Bản ghi không tồn tạ.i", success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      var user_id = req.body.user_id;
      var old_password = req.body.old_password;
      var new_password = req.body.new_password;
      var lu_user_id = req.body.lu_user_id;
      await this.userService.changePassword(user_id, old_password, new_password, lu_user_id);
      res.json({ message: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại!", success: true })
    }
    catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      var user_name = req.body.user_name;
      var email = req.body.email;
      await this.userService.resetPassword(user_name, email);
      res.json({ message: "Đổi mật khẩu thành công. Vui lòng check Email!", success: true })
    }
    catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async resetPasswordByAdmin(req: Request, res: Response): Promise<void> {
    try {
      var user_id = req.body.user_id;
      var lu_user_id = req.body.lu_user_id;
      var new_password = await this.userService.resetPasswordByAdmin(user_id, lu_user_id);
      res.json({ message: `Đổi mật khẩu thành công. Mật khẩu mới là ${new_password}`, success: true, password: new_password })
    }
    catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }
}
