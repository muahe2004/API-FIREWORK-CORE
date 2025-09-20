import { injectable } from 'tsyringe';
import { RoleFunctionRepository } from '../repositories/roleFunctionRepository';
import { Action } from '../models/action';
import { RoleFunction } from '../models/roleFunction';
import { v4 as uuidv4 } from 'uuid';
@injectable()
export class RoleFuntionService {
  constructor(private rfRepository: RoleFunctionRepository
  ) {}

  async createRoleFunction(role_function_list:any, created_by_user_id:string): Promise<any> {
    for(let role of role_function_list){
      role.role_function_id = uuidv4();
    }
    return this.rfRepository.createRoleFunction(role_function_list, created_by_user_id);
  }

  async deleteRoleFunction(list_json:any, updated_by_id:string): Promise<any> {
    return this.rfRepository.deleteRoleFunction(list_json,updated_by_id);
  }

}