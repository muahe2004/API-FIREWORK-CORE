import { injectable } from 'tsyringe';
import { UserRole } from '../models/userRoles';
import { Database } from '../config/database';

@injectable()
export class UserRoleRepository {
  constructor(private db: Database) { }  

  async createUserRole(user_role_list:any, created_by_user_id:string): Promise<any> {
    try {
      const sql = 'CALL InsertUserRole(?, ?, @err_code, @err_msg)';
      let data = await this.db.query(sql, [
        JSON.stringify(user_role_list),
        created_by_user_id
      ]); 
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }


  async deleteUserRole(list_json:any, updated_by_id:string): Promise<any> {
    try {
      const sql = 'CALL DeleteUserRole(?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [JSON.stringify(list_json),  updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async getUserRole(user_id:any, role_id:string): Promise<any> {
    try {
      const sql = 'CALL GetUserRole(?, ?, @err_code, @err_msg)';
      let [data] = await this.db.query(sql, [user_id,  role_id]);
      return data;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

}