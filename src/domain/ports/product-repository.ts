import { ProductData } from '../entities/product';

export interface SearchParams {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class ProductRepository {
  abstract create(product: ProductData): Promise<ProductData>;
  abstract findById(id: string): Promise<ProductData | null>;
  abstract update(id: string, product: ProductData): Promise<ProductData | null>;
  abstract delete(id: string): Promise<ProductData | null>;
  abstract findAll(): Promise<ProductData[]>;
  abstract search(params: SearchParams): Promise<ProductData[]>;
}