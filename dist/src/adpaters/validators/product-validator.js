"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSchema = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(1).messages({
        'string.empty': 'Product name is required',
        'any.required': 'Product name is required',
    }),
    price: joi_1.default.number().required().min(0).messages({
        'number.min': 'Price must be a non-negative number',
        'any.required': 'Price is required',
    }),
    stock: joi_1.default.number().required().min(0).integer().messages({
        'number.min': 'Stock must be a non-negative number',
        'number.integer': 'Stock must be an integer',
        'any.required': 'Stock is required',
    }),
});
exports.searchSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    minPrice: joi_1.default.number().min(0).optional(),
    maxPrice: joi_1.default.number().min(0).optional(),
}).and('minPrice', 'maxPrice').when(joi_1.default.object({ minPrice: joi_1.default.exist(), maxPrice: joi_1.default.exist() }), {
    then: joi_1.default.object({
        maxPrice: joi_1.default.number().min(joi_1.default.ref('minPrice')).messages({
            'number.min': 'maxPrice must be greater than or equal to minPrice',
        }),
    }),
});
