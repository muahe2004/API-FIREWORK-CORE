import { injectable } from 'tsyringe';
import { BranchRepository } from '../repositories/branchRepository';
import { Branch } from '../models/branch';

@injectable()
export class BranchService {
  constructor(private branchRepository: BranchRepository
  ) {}

  async getBranchDropdown(): Promise<any> {
    return this.branchRepository.getBranchDropdown();
  }

  async getBranchById(id: string): Promise<any> {
    return this.branchRepository.getBranchById(id);
  }

  async createBranch(branch: Branch): Promise<any> {
    return this.branchRepository.createBranch(branch);
  }

  async updateBranch(branch: Branch): Promise<any> {
    return this.branchRepository.updateBranch(branch);
  }

  async deleteBranch(list_json:any, updated_by_id:string): Promise<any> {
    return this.branchRepository.deleteBranch(list_json,updated_by_id);
  }
  async searchBranch(pageIndex:number,pageSize:number, search_content:string, branch_name:string, phone:string, fax:string, address:string): Promise<Branch> {
    return this.branchRepository.searchBranch(pageIndex,pageSize,search_content,branch_name,phone,fax,address);
  }
  
}