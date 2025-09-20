import { injectable } from 'tsyringe';
import { RoleRepository } from '../repositories/roleRepository';
import { Role } from '../models/role';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository
  ) {}

  async getRoleById(id: string): Promise<any> {
    return this.roleRepository.getRoleById(id);
  }

  async getRoleByUserId(id: string): Promise<any> {
    return this.roleRepository.getRoleByUserId(id);
  }

  async createRole(role: Role): Promise<any> {
    role.role_id = uuidv4();
    return this.roleRepository.createRole(role);
  }

  async updateRole(role: Role): Promise<any> {
    return this.roleRepository.updateRole(role);
  }

  async deleteRole(list_json:any, updated_by_id:string): Promise<any> {
    return this.roleRepository.deleteRole(list_json,updated_by_id);
  }

  async searchRole(pageIndex:number, pageSize:number, search_content:string, role_id:string, role_code:string, role_name:string, description:string): Promise<any> {
    let dbResults = await this.roleRepository.searchRole(pageIndex, pageSize,search_content,role_id,role_code,role_name,description);
    return dbResults;
  }
  
}