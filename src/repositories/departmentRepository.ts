import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Department } from '../models/department';

@injectable()
export class DepartmentRepository {
  constructor(private db: Database) { }

  async createDepartment(department: Department): Promise<any> {
    try {
      const sql = 'CALL InsertDepartment(?, ?, ?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [department.department_name, department.phone, department.fax, department.address, department.created_by_user_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async updateDepartment(department: Department): Promise<any> {
    try {
      const sql = 'CALL UpdateDepartment(?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [department.department_id,department.department_name, department.phone, department.fax, department.address, department.lu_user_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async deleteDepartment(list_json:any, updated_by_id:string): Promise<any> {
    try {
      const sql = 'CALL DeleteDepartmentMulti(?, ?, @err_code, @err_msg)';
      await this.db.query(sql, [JSON.stringify(list_json),  updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error( error.message);
    }
  }

  async getDepartmentById(id: string): Promise<any> {
    try {
      const sql = 'CALL GetDepartmentById(?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

  async getDepartmentDropdown(): Promise<any> {
    try {
      const sql = 'CALL GetDepartmentDropdown(@err_code, @err_msg)';
      const [results] = await this.db.query(sql, []);
      return results;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

  async searchDepartment(pageIndex:number,pageSize:number, search_content:string, department_id: number,department_name:string, phone:string, fax:string, address:string): Promise<any> {
    try {
      const sql = 'CALL SearchDepartment(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [pageIndex,pageSize,search_content,department_id,department_name,phone,fax,address]);
      return results;
    } catch (error:any) {
      throw new Error( error.message);
    }
  }

}
