import { injectable } from 'tsyringe';
import { ProductRepository } from '../repositories/productRepository';
import { IProduct } from '../models/product';

@injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository
  ) {}

  // async getBranchDropdown(): Promise<any> {
  //   return this.branchRepository.getBranchDropdown();
  // }

  // async getBranchById(id: string): Promise<any> {
  //   return this.branchRepository.getBranchById(id);
  // }

  async createProduct(product: IProduct): Promise<any> {
    return this.productRepository.createProduct(product);
  }

  async updateProduct(product: IProduct): Promise<any> {
    return this.productRepository.updateProduct(product);
  }

  async deleteProduct(list_json:any): Promise<any> {
    return this.productRepository.deleteProduct(list_json);
  }

  async searchProduct(pageIndex:number,pageSize:number, search_content:string, product_name:string, product_code:string): Promise<IProduct> {
    return this.productRepository.searchProduct(pageIndex,pageSize,search_content,product_name,product_code);
  }
}