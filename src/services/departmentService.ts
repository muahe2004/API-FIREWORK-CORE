import { injectable } from 'tsyringe';
import { DepartmentRepository } from '../repositories/departmentRepository';
import { Department} from '../models/department';

@injectable()
export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository
  ) {}

  async getDepartmentDropdown(): Promise<any> {
    return this.departmentRepository.getDepartmentDropdown();
  }

  async getDepartmentById(id: string): Promise<any> {
    return this.departmentRepository.getDepartmentById(id);
  }

  async createDepartment(Department: Department): Promise<any> {
    return this.departmentRepository.createDepartment(Department);
  }

  async updateDepartment(Department: Department): Promise<any> {
    return this.departmentRepository.updateDepartment(Department);
  }

  async deleteDepartment(list_json:any, updated_by_id:string): Promise<any> {
    return this.departmentRepository.deleteDepartment(list_json,updated_by_id);
  }
  async searchDepartment(pageIndex:number,pageSize:number, search_content:string, department_id: number,department_name:string, phone:string, fax:string, address:string): Promise<Department> {
    return this.departmentRepository.searchDepartment(pageIndex,pageSize,search_content,department_id,department_name,phone,fax,address);
  }

}
