import { injectable } from 'tsyringe';
import { Database } from '../config/database';
// import { IProduct } from '../models/product';

@injectable()
export class ProductTypeRepository {
  constructor(private db: Database) { }  

  // async createProduct(product: IProduct): Promise<any> {
  //   try {
  //     const sql = 'CALL InsertProduct(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
  //     await this.db.query(sql, [
  //       product.product_code, product.product_name, product.image_url, 
  //       product.type_id, product.price, product.stock, product.unit, product.description
  //     ]);
  //     return true;
  //   } catch (error: any) {
  //     throw new Error( error.message);
  //   }
  // }

  // async updateProduct(product: IProduct): Promise<any> {
  //   try {
  //     const sql = 'CALL UpdateProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
  //     await this.db.query(sql, [
  //       product.product_id, product.product_code, product.product_name, product.image_url, 
  //       product.type_id, product.price, product.stock, product.unit, product.description
  //     ]);
  //     return true;
  //   } catch (error: any) {
  //     throw new Error( error.message);
  //   }
  // }

  // async deleteProduct(list_json:any): Promise<any> {
  //   try {
  //     const sql = 'CALL DeleteProductMulti(?, @err_code, @err_msg)';
  //     await this.db.query(sql, [JSON.stringify(list_json)]);
  //     return true;
  //   } catch (error: any) {
  //     throw new Error( error.message);
  //   }
  // }

  //  async getBranchById(id: string): Promise<any> {
  //   try {
  //     const sql = 'CALL GetBranchById(?, @err_code, @err_msg)';
  //     const [results] = await this.db.query(sql, [id]);      
  //     if (Array.isArray(results) && results.length > 0) {
  //       return results[0];
  //     } 
  //     return null; 
  //   } catch (error:any) {
  //     throw new Error( error.message);
  //   }
  // }

  async getProductTypeDropdown(): Promise<any> {
    try {
      const sql = 'CALL GetProductTypeDropdown(@err_code, @err_msg)';
      const [results] = await this.db.query(sql, []);
      return results;       
    } catch (error:any) {
      throw new Error( error.message);
    }
  } 
  
  // async searchProduct(pageIndex:number,pageSize:number, search_content:string, product_name:string, product_code: string): Promise<any> {
  //   try {
  //     const sql = 'CALL SearchProduct(?, ?, ?, ?, ?, @err_code, @err_msg)';
  //     const [results] = await this.db.query(sql, [pageIndex,pageSize,search_content,product_name,product_code]);
  //     return results;
  //   } catch (error:any) {
  //     throw new Error( error.message);
  //   }
  // }
}