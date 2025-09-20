import { injectable } from 'tsyringe';
import { FunctionRepository } from '../repositories/functionRespository';
import { FunctionModel } from '../models/function';
import { v4 as uuidv4 } from 'uuid';
import { Tree } from '../ultilities/tree';

@injectable()
export class FunctionService {
  constructor(private functionRepository: FunctionRepository, private treeUltility: Tree
  ) {}

  async getFunctionById(id: string): Promise<any> {
    return this.functionRepository.getFunctionById(id);
  }

  async createFunction(func: FunctionModel): Promise<any> {
    func.function_id = uuidv4()
    func.parent_id = func.parent_id==null?"":func.parent_id;
    return this.functionRepository.createFunction(func);
  }

  async updateFunction(func: FunctionModel): Promise<any> {
    return this.functionRepository.updateFunction(func);
  }

  async deleteFunction(list_json:any, updated_by_id:string): Promise<any> {
    return this.functionRepository.deleteFunction(list_json,updated_by_id);
  } 

  async searchFunction(pageIndex:number, pageSize:number, search_content:string, function_id:string, parent_id:string, function_name:string, url:string, description:string, level:number ): Promise<any> {
    let dbResults = await this.functionRepository.searchFunction(pageIndex,
        pageSize, 
        search_content,
        function_id,
        parent_id,
        function_name,
        url,
        description,
        level);
    let data = this.treeUltility.getFunctionTree(dbResults, 1, "0");   
    return data;
  }

  async getFunctionByRole(role_id: string){
    return this.functionRepository.getFunctionsByRolesId(role_id);
  }
  
}