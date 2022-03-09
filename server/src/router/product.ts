import { Db } from './../database';
import express from 'express';
const productRouter = express.Router()


productRouter.get('/', async (req, res) => {
    const database = await Db.get();
    console.log(database.db.get('select * from products'));

    res.send('Test');
});

productRouter.get('/pseudo-data', async (req, res) => {
    const database = await Db.get();

    res.send('Pseudo Data generated.');
});

export { productRouter }; 