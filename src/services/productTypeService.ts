import { injectable } from 'tsyringe';
import { ProductTypeRepository } from '../repositories/productTypeRepository';

@injectable()
export class ProductTypeService {
  constructor(private productTypeRepository: ProductTypeRepository
  ) {}

  async getProductTypeDropdown(): Promise<any> {
    return this.productTypeRepository.getProductTypeDropdown();
  }

  // async getBranchById(id: string): Promise<any> {
  //   return this.branchRepository.getBranchById(id);
  // }

  // async createProduct(product: IProduct): Promise<any> {
  //   return this.productRepository.createProduct(product);
  // }

  // async updateProduct(product: IProduct): Promise<any> {
  //   return this.productRepository.updateProduct(product);
  // }

  // async deleteProduct(list_json:any): Promise<any> {
  //   return this.productRepository.deleteProduct(list_json);
  // }

  // async searchProduct(pageIndex:number,pageSize:number, search_content:string, product_name:string, product_code:string): Promise<IProduct> {
  //   return this.productRepository.searchProduct(pageIndex,pageSize,search_content,product_name,product_code);
  // }
}