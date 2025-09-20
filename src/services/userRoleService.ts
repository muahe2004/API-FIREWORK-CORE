import { injectable } from 'tsyringe';
import { RoleFunctionRepository } from '../repositories/roleFunctionRepository';
import { Action } from '../models/action';
import { RoleFunction } from '../models/roleFunction';
import { UserRoleRepository } from '../repositories/userRoleRepository';
import { UserRole } from '../models/userRoles';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class UserRoleService {
  constructor(private rfRepository: UserRoleRepository
  ) {}

  async createUserRole(user_role_list:any, created_by_user_id:string): Promise<any> {
    for(let item of user_role_list){
      item.user_role_id = uuidv4();
    }
    return this.rfRepository.createUserRole(user_role_list, created_by_user_id);
  }

  async deleteUserRole(list_json:any, updated_by_id:string): Promise<any> {
    return this.rfRepository.deleteUserRole(list_json,updated_by_id);
  }

  async getUserRole(user_id: string, role_id: string): Promise<any> {
    let data = await this.rfRepository.getUserRole(user_id, role_id);
    let result = [];
    for(let row of data){
      let detail = row as UserRole;
      result.push(detail.role_id);
    }
    return result;
  }

}