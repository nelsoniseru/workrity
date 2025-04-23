import { Request, Response } from 'express';
import { ProductService } from '../../domain/services/product-services';
import { ProductData } from '../../domain/entities/product';
import { productSchema, searchSchema } from '../validators/product-validator';

interface SearchQuery {
  name?: string;
  minPrice?: string;
  maxPrice?: string;
}

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { error } = productSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
      const product: ProductData = await this.productService.createProduct(req.body);
      res.status(201).json({status:true,data:product});
    } catch (error: any) {
      res.status(400).json({status:false, error: error.message });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const product: ProductData = await this.productService.getProductById(req.params.id);
      res.status(200).json({status:true,data:product});
    } catch (error: any) {
      res.status(404).json({status:false, error: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { error } = productSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
      const product: ProductData = await this.productService.updateProduct(req.params.id, req.body);
      res.status(200).json({status:true,data:product});
    } catch (error: any) {
      res.status(400).json({status:false, error: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await this.productService.deleteProduct(req.params.id);
      res.status(204).send({status:true});
    } catch (error: any) {
      res.status(404).json({status:false, error: error.message });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products: ProductData[] = await this.productService.getAllProducts();
      res.status(200).json({status:false,data:products});
    } catch (error: any) {
      res.status(400).json({status:false, error: error.message });
    }
  }

  async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const { error } = searchSchema.validate(req.query);
      if (error) throw new Error(error.details[0].message);
      console.log(req.query)
      const { name, minPrice, maxPrice }: SearchQuery = req.query;
      const products: ProductData[] = await this.productService.searchProducts({
        name,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
      res.status(200).json({status:true,data:products});
    } catch (error: any) {
      res.status(400).json({status:false, error: error.message });
    }
  }
}