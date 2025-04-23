import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required().min(1).messages({
    'string.empty': 'Product name is required',
    'any.required': 'Product name is required',
  }),
  price: Joi.number().required().min(0).messages({
    'number.min': 'Price must be a non-negative number',
    'any.required': 'Price is required',
  }),
  stock: Joi.number().required().min(0).integer().messages({
    'number.min': 'Stock must be a non-negative number',
    'number.integer': 'Stock must be an integer',
    'any.required': 'Stock is required',
  }),
});

export const searchSchema = Joi.object({
  name: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
}).and('minPrice', 'maxPrice').when(Joi.object({ minPrice: Joi.exist(), maxPrice: Joi.exist() }), {
  then: Joi.object({
    maxPrice: Joi.number().min(Joi.ref('minPrice')).messages({
      'number.min': 'maxPrice must be greater than or equal to minPrice',
    }),
  }),
});