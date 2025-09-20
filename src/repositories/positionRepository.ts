import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Position } from '../models/position';

@injectable()
export class PositionRepository {
  constructor(private db: Database) { }

  async createPosition(position: Position): Promise<any> {
    try {
      const sql = 'CALL InsertPosition(?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [position.position_name, position.description, position.created_by_user_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async updatePosition(position: Position): Promise<any> {
    try {
      const sql = 'CALL UpdatePosition(?, ?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [position.position_id,position.position_name, position.description, position.lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async deletePosition(list_json:any, updated_by_id:string): Promise<any> {
    try {
      const sql = 'CALL DeletePositionMulti(?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [JSON.stringify(list_json),  updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async getPositionById(id: string): Promise<any> {
    try {
      const sql = 'CALL GetPositionById(?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

  async getPositionDropdown(): Promise<any> {
    try {
      const sql = 'CALL GetPositionDropdown(@err_code, @err_msg)';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

  async searchPosition(pageIndex:number,pageSize:number, search_content:string, position_id: string, position_name:string, description: string): Promise<any> {
    try {
      const sql = 'CALL SearchPosition(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [pageIndex,pageSize,search_content, position_id,position_name,description]);
      return results;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

}
