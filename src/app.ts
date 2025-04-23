import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import connectDB from './config/db';
import productRoutes from './adpaters/routes/product-routes';

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use('/api/products', productRoutes);

const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT: string | number = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

export default app;