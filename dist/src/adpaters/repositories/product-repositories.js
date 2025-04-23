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
exports.MongoDBProductRepository = void 0;
const mongoose_1 = require("mongoose");
const product_repository_1 = require("../../domain/ports/product-repository");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
});
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
class MongoDBProductRepository extends product_repository_1.ProductRepository {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield ProductModel.create(product);
            return created;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductModel.findById({ _id: id });
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductModel.findByIdAndUpdate(id, product, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductModel.findByIdAndDelete(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductModel.find();
        });
    }
    search(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, minPrice, maxPrice }) {
            const query = {};
            if (name)
                query.name = { $regex: name, $options: 'i' };
            if (minPrice)
                query.price = Object.assign(Object.assign({}, query.price), { $gte: minPrice });
            if (maxPrice)
                query.price = Object.assign(Object.assign({}, query.price), { $lte: maxPrice });
            return yield ProductModel.find(query);
        });
    }
}
exports.MongoDBProductRepository = MongoDBProductRepository;
