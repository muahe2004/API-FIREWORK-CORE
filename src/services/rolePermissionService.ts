import { injectable } from 'tsyringe';
import { RoleFunctionRepository } from '../repositories/roleFunctionRepository';
import { Action } from '../models/action';
import { RoleFunction } from '../models/roleFunction';
import { RolePermissionRepository } from '../repositories/rolePermissionRepository';
import { RolePermission } from '../models/rolePermission';
import { v4 as uuidv4 } from 'uuid';
@injectable()
export class RolePermissionService {
  constructor(private rfRepository: RolePermissionRepository
  ) {}

  async createRolePermission(role_permission_list:any, created_by_user_id:string): Promise<any> {
    for (let permission of role_permission_list)
      permission.role_permission_id = uuidv4();
    return this.rfRepository.createRolePermission(role_permission_list, created_by_user_id);
  }

  async deleteRolePermission(list_json:any, updated_by_id:string): Promise<any> {
    return this.rfRepository.deleteRolePermission(list_json,updated_by_id);
  }

  async getRolePermission(role_id: string, function_id: string): Promise<any> {
    let data = await this.rfRepository.getRolePermission(role_id, function_id);
    let result = [];
    for(let row of data){
      let detail = row as RolePermission;
      result.push(detail.action_code);
    }
    return result;
  }

}