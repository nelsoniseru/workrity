import { ProductService } from '../domain/services/product-services';
import { MongoDBProductRepository } from '../adpaters/repositories/product-repositories';
import { ProductData } from '../domain/entities/product';

describe('ProductService', () => {
  let productService: ProductService;

  beforeAll(() => {
    const productRepository = new MongoDBProductRepository();
    productService = new ProductService(productRepository);
  });

  it('should create a product successfully', async () => {
    const productData: ProductData = { name: 'Laptop', price: 999.99, stock: 10 };
    const product = await productService.createProduct(productData);
    expect(product.name).toBe(productData.name);
    expect(product.price).toBe(productData.price);
    expect(product.stock).toBe(productData.stock);
  });

  it('should retrieve a product by ID', async () => {
    const productData: ProductData = { name: 'Phone', price: 499.99, stock: 20 };
    const created = await productService.createProduct(productData);
    console.log(created.id)
    const product = await productService.getProductById(created.id!);
    expect(product.name).toBe(productData.name);
  });

  it('should throw an error if product not found', async () => {
    await expect(productService.getProductById('680912d5428d659794349fdc')).rejects.toThrow('Product not found');
  });
});