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
exports.ProductController = void 0;
const product_validator_1 = require("../validators/product-validator");
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = product_validator_1.productSchema.validate(req.body);
                if (error)
                    throw new Error(error.details[0].message);
                const product = yield this.productService.createProduct(req.body);
                res.status(201).json({ status: true, data: product });
            }
            catch (error) {
                res.status(400).json({ status: false, error: error.message });
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.getProductById(req.params.id);
                res.status(200).json({ status: true, data: product });
            }
            catch (error) {
                res.status(404).json({ status: false, error: error.message });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = product_validator_1.productSchema.validate(req.body);
                if (error)
                    throw new Error(error.details[0].message);
                const product = yield this.productService.updateProduct(req.params.id, req.body);
                res.status(200).json({ status: true, data: product });
            }
            catch (error) {
                res.status(400).json({ status: false, error: error.message });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productService.deleteProduct(req.params.id);
                res.status(204).send({ status: true });
            }
            catch (error) {
                res.status(404).json({ status: false, error: error.message });
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getAllProducts();
                res.status(200).json({ status: false, data: products });
            }
            catch (error) {
                res.status(400).json({ status: false, error: error.message });
            }
        });
    }
    searchProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = product_validator_1.searchSchema.validate(req.query);
                if (error)
                    throw new Error(error.details[0].message);
                console.log(req.query);
                const { name, minPrice, maxPrice } = req.query;
                const products = yield this.productService.searchProducts({
                    name,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined,
                });
                res.status(200).json({ status: true, data: products });
            }
            catch (error) {
                res.status(400).json({ status: false, error: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
