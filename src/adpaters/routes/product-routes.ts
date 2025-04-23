import { Router } from 'express';
import { ProductController } from '../controllers/product-controller';
import { ProductService } from '../../domain/services/product-services';
import { MongoDBProductRepository } from '../repositories/product-repositories';

const router: Router = Router();
const productRepository = new MongoDBProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post('/', (req, res) => productController.createProduct(req, res));
router.get('/:id', (req, res) => productController.getProduct(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));
router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/search/items', (req, res) => productController.searchProducts(req, res));

export default router;