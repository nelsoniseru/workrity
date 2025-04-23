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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./src/app"));
describe('Product Controller', () => {
    it('POST /api/products should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .send({ name: 'Phone', price: 499.99, stock: 20 });
        expect(response.status).toBe(201);
    }));
    it('POST /api/products should fail with invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .send({ name: '', price: -1, stock: -1 });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Product name is required');
    }));
    it('GET /api/products should return all products', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .send({ name: 'Tablet', price: 299.99, stock: 15 });
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
    }));
    it('GET /api/products/search should filter products', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/products')
            .send({ name: 'Laptop', price: 999.99, stock: 10 });
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/products/search/items?name=Laptop');
        expect(response.status).toBe(200);
        expect(response.body.data[0].name).toBe('Laptop');
    }));
});
