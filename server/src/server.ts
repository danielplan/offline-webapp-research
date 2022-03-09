import { errorHandler } from './errorHandler';
import express from 'express';
import cors from 'cors';
import { productRouter } from './router/product';

export const createServer = (): express.Application => {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.json());
    app.use('/product', productRouter);

    app.disable('x-powered-by');
    app.use(errorHandler);
    return app;
}