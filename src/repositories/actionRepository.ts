import { injectable } from 'tsyringe';
import { Action } from '../models/action';
import { Database } from '../config/database';

@injectable()
export class ActionRepository {
  constructor(private db: Database) { }  

  async createAction(action: Action): Promise<any> {
    try {
      const sql = 'CALL InsertAction(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [
        action.action_api_url,
        action.action_code,
        action.function_id,
        action.action_name,
        action.description,
        action.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async updateAction(action: Action): Promise<any> {
    try {
      const sql = 'CALL UpdateAction(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [
        action.action_api_url,
        action.action_code,
        action.function_id,
        action.action_name,
        action.description,
        action.lu_user_id
    ]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async deleteAction(list_json:any, updated_by_id:string): Promise<any> {
    try {
      const sql = 'CALL DeleteAction(?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [JSON.stringify(list_json),  updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

   async getActionById(id: string): Promise<any> {
    try {
      const sql = 'CALL GetActionById(?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [id]);      
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } 
      return null; 
    } catch (error:any) {
      throw new Error( error.message);
    }
  }
  
  async searchAction(pageIndex:number, pageSize:number, search_content:string, function_id:string, action_code:string, action_name:string, description:string): Promise<any[]> {
    try {
      const sql = 'CALL SearchAction(?, ?, ?, ?, ?, ?, ?,@err_code, @err_msg)';
      const [results] = await this.db.query(sql, [
            pageIndex,
            pageSize,
            search_content,
            function_id,
            action_code,
            action_name,
            description,
        ]);
      return results;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

}