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
exports.ProductService = void 0;
const product_1 = require("../entities/product");
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new product_1.Product(data);
            return yield this.productRepository.create(product);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Product ID is required');
            const product = yield this.productRepository.findById(id);
            if (!product)
                throw new Error('Product not found');
            return product;
        });
    }
    updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Product ID is required');
            const product = new product_1.Product(Object.assign(Object.assign({}, data), { id }));
            const updated = yield this.productRepository.update(id, product);
            if (!updated)
                throw new Error('Product not found');
            return updated;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Product ID is required');
            const deleted = yield this.productRepository.delete(id);
            if (!deleted)
                throw new Error('Product not found');
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findAll();
        });
    }
    searchProducts(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.search(params);
        });
    }
}
exports.ProductService = ProductService;
