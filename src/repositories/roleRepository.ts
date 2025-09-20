import { injectable } from 'tsyringe';
import { Role } from '../models/role';
import { Database } from '../config/database';

@injectable()
export class RoleRepository {
  constructor(private db: Database) { }  

  async createRole(role: Role ): Promise<any>  {
    try {
      const sql = 'CALL InsertRole(?, ?, ?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [
        role.role_id,
        role.role_code,
        role.role_name,
        role.description,
        role.created_by_user_id
    ]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    } 
  }

  async updateRole(role: Role ): Promise<any> {
    try {
      const sql = 'CALL UpdateRole(?, ?, ?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [
        role.role_id,
        role.role_code,
        role.role_name,
        role.description,
        role.lu_user_id
    ]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async deleteRole(list_json:any, updated_by_id:string): Promise<any> {
    try {
      const sql = 'CALL DeleteRole(?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [JSON.stringify(list_json),  updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

   async getRoleById(id: string): Promise<any> {
    try {
      const sql = 'CALL GetRoleById(?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [id]);      
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } 
      return null; 
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

  async getRoleByUserId(id: string): Promise<any> {
    try {
      const sql = 'CALL GetRoleByUserId(?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [id]);      
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } 
      return null; 
    } catch (error:any) {
      throw new Error( error.message);
    }
  }
  
  async searchRole(pageIndex:number, pageSize:number, search_content:string, role_id:string, role_code:string, role_name:string, description:string): Promise<any[]> {
    try {
      const sql = 'CALL SearchRole(?, ?, ?, ?, ?, ?, ?,@err_code, @err_msg)';
      const [results] = await this.db.query(sql, [
            pageIndex,
            pageSize,
            search_content,
            role_id,
            role_code,
            role_name,
            description,
        ]);
      return results;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

}