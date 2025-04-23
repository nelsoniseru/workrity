"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_services_1 = require("../domain/services/product-services");
const product_repositories_1 = require("../adpaters/repositories/product-repositories");
describe('ProductService', () => {
    let productService;
    beforeAll(() => {
        const productRepository = new product_repositories_1.MongoDBProductRepository();
        productService = new product_services_1.ProductService(productRepository);
    });
    it('should create a product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const productData = { name: 'Laptop', price: 999.99, stock: 10 };
        const product = yield productService.createProduct(productData);
        expect(product.name).toBe(productData.name);
        expect(product.price).toBe(productData.price);
        expect(product.stock).toBe(productData.stock);
    }));
    it('should retrieve a product by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const productData = { name: 'Phone', price: 499.99, stock: 20 };
        const created = yield productService.createProduct(productData);
        const product = yield productService.getProductById(created.id);
        expect(product.name).toBe(productData.name);
    }));
    it('should throw an error if product not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(productService.getProductById('nonexistent')).rejects.toThrow('Product not found');
    }));
});
