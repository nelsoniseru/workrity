import { Product, ProductData } from '../entities/product';
import { ProductRepository, SearchParams } from '../ports/product-repository';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(data: ProductData): Promise<ProductData> {
    const product = new Product(data);
    return await this.productRepository.create(product);
  }

  async getProductById(id: string): Promise<ProductData> {
    if (!id) throw new Error('Product ID is required');
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }
  

  async updateProduct(id: string, data: ProductData): Promise<ProductData> {
    if (!id) throw new Error('Product ID is required');
    const product = new Product({ ...data, id });
    const updated = await this.productRepository.update(id, product);
    if (!updated) throw new Error('Product not found');
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    if (!id) throw new Error('Product ID is required');
    const deleted = await this.productRepository.delete(id);
    if (!deleted) throw new Error('Product not found');
  }

  async getAllProducts(): Promise<ProductData[]> {
    return await this.productRepository.findAll();
  }

  async searchProducts(params: SearchParams): Promise<ProductData[]> {
    return await this.productRepository.search(params);
  }
}