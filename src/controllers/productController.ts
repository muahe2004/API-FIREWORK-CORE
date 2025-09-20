import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { ProductService } from '../services/productService';
import { IProduct } from '../models/product';
const cache = require('memory-cache');
@injectable()
export class ProductController {
  constructor(private productService: ProductService
  ) { }

  // async getBranchDropdown(req: Request, res: Response): Promise<void> {
  //   try {
  //     const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  //     const key = 'ListBranch';
  //     const cachedData = cache.get(key);
  //     if (cachedData) {
  //       res.json(cachedData);
  //     } else {
  //       const data = await this.branchService.getBranchDropdown();
  //       if (data && data.length > 0) {
  //         cache.put(key, data, oneDayInMilliseconds);
  //         res.json(data);
  //       } else {
  //         res.json({ message: 'Không lấy được danh sách.', success: true });
  //       }
  //     }
  //   } catch (error: any) {
  //     res.json({ message: error.message, success: false });
  //   }
  // }

  // async getBranchById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const id = req.params.id;
  //     const branch = await this.branchService.getBranchById(id);
  //     if (branch) {
  //       res.json(branch);
  //     } else {
  //       res.json({ message: 'Bản ghi không tồn tại.', success: true });
  //     }
  //   } catch (error: any) {
  //     res.json({ message: error.message, success: false });
  //   }
  // }


  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = req.body as IProduct;
      const results = await this.productService.createProduct(product);
      cache.del('ListProduct');
      res.json({ message: 'Đã thêm thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = req.body as IProduct;
      const results = await this.productService.updateProduct(product);
      cache.del('ListProduct');
      res.json({ message: 'Đã cập nhật thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any};
      const results = await this.productService.deleteProduct(object.list_json);
      cache.del('ListProduct');
      res.json({ message: 'Đã xóa thành công.', success: true });
    } catch (error: any) {
      res.json({ message: error.message, success: false }); 
    }
  }

  async searchProduct(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { pageIndex: number, pageSize: number, search_content: string, product_name: string, product_code: string };
      const data: any = await this.productService.searchProduct(object.pageIndex, object.pageSize, object.search_content, object.product_name, object.product_code);
      if (data) {
        res.json({
          totalItems: Math.ceil(data && data.length > 0 ? data[0].RecordCount : 0),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil((data && data.length > 0 ? data[0].RecordCount : 0) / (object.pageSize ? object.pageSize : 1))
        });
      } else {
        res.json({ message: 'Không tồn tại kết quả tìm kiếm.', success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }
}