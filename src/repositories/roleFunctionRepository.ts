import { injectable } from 'tsyringe';
import { RoleFunction } from '../models/roleFunction';
import { Database } from '../config/database';

@injectable()
export class RoleFunctionRepository {
  constructor(private db: Database) { }  

  async createRoleFunction(role_function_list:any, created_by_user_id:string): Promise<any> {
    try {
      const sql = 'CALL InsertRoleFunction(?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [
        JSON.stringify(role_function_list),
        created_by_user_id
      ]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }


  async deleteRoleFunction(list_json:any, updated_by_id:string): Promise<any> {
    try {
      const sql = 'CALL DeleteRoleFunction(?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [JSON.stringify(list_json),  updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

}