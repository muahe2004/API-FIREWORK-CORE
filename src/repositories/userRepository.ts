import { injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { Database } from "../config/database";
import { User } from "../models/user";

@injectable()
export class UserRepository {
  constructor(private db: Database) { }
  async authenticate(username: string, password: string): Promise<any> {
    try {
      const sql = "CALL GetUserByAccount(?, @err_code, @err_msg)";
      const results = await this.db.query(sql, [username]);
      if (Array.isArray(results) && results.length > 0) {
        let user = results[0][0];
        if (user) { 
          if (Array.isArray(results[1]) && results.length > 0)
            user.employees = results[1];
          if (user.password == password) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async lockUser(user: User): Promise<any> {
    try {
      const sql =
        "CALL LockUser(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        user.user_id,
        user.online_flag,
        user.lu_user_id
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async creatUser(user: User): Promise<any> {
    try {
      const sql =
        "CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@err_code, @err_msg)";
      await this.db.query(sql, [
        user.branch_id,
        user.employee_id,
        user.department_id,
        user.position_id,        
        user.user_id,
        user.user_name,
        user.password,
        user.type,
        user.description,
        user.first_name,
        user.middle_name,
        user.last_name,
        user.full_name,
        user.avatar,
        user.gender,
        user.date_of_birth,
        user.email,
        user.phone_number,
        user.is_guest,
        user.created_by_user_id
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateUser(user: User): Promise<any> {
    try {
      const sql =
        "CALL UpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        user.branch_id,
        user.employee_id,
        user.department_id,
        user.position_id,        
        user.user_id,
        user.type,
        user.description,
        user.first_name,
        user.middle_name,
        user.last_name,
        user.full_name,
        user.avatar,
        user.gender,
        user.date_of_birth,
        user.email,
        user.phone_number,
        user.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteUser(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteUser(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const sql = 'CALL GetUserById(?, @err_code, @err_msg)';
      const results = await this.db.queryList(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getFunctionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetFunctionByUserId(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getActionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetActionByUserId(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchUser(
    pageIndex: number,
    pageSize: number,
    search_content: string, 
    branch_id: string,
    department_id: string,
    customer_id: string,
    user_id: string
  ): Promise<any[]> {
    try {
      const sql =
        "CALL SearchUser(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content,
        branch_id,
        department_id,
        customer_id,
        user_id
      ]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async changePassword(user_id: string, old_password: string, new_password: string, lu_user_id: string) {
    try {
      const sql = 'CALL ChangePassword(?, ?, ?, ?,@err_code, @err_msg)';
      await this.db.query(sql, [user_id, old_password, new_password, lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async resetPassword(user_name: string, email: string, new_password: string) {
    try {
      const sql = 'CALL ResetPassword(?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [user_name, email, new_password]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async resetPasswordByAdmin(user_id: string, new_password: string, lu_user_id: string) {
    try {
      const sql = 'CALL ResetPasswordByAdmin(?, ?, ?, @err_code, @err_msg)';
      var [result] = await this.db.query(sql, [user_id, new_password, lu_user_id]);
      if (result.length > 0) {
        var email = result[0].email;
      }
      else throw new Error("Không tồn tại email");
      return email;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
