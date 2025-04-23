import mongoose, { Schema, model, Model } from 'mongoose';
import { ProductRepository, SearchParams } from '../../domain/ports/product-repository';
import {ProductData} from '../../domain/entities/product'
interface ProductDocument extends ProductData, Document {}

const productSchema: Schema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
});

const ProductModel: Model<ProductDocument> = model<ProductDocument>('Product', productSchema);

export class MongoDBProductRepository extends ProductRepository {
  async create(product: ProductData): Promise<ProductData> {
    const created = await ProductModel.create(product);
    return created;
  }

  async findById(id: string): Promise<ProductData | null> {
    return await ProductModel.findById({_id:id});
  }

  async update(id: string, product: ProductData): Promise<ProductData | null> {
    return await ProductModel.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id: string): Promise<ProductData | null> {
    return await ProductModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<ProductData[]> {
    return await ProductModel.find();
  }

  async search({ name, minPrice, maxPrice }: SearchParams): Promise<ProductData[]> {
    const query: any = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (minPrice) query.price = { ...query.price, $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    return await ProductModel.find(query);
  }
}