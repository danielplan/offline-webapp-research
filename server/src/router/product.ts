import { randomString, randomNumber } from './../dummy';
import { Db } from './../database';
import express from 'express';
const productRouter = express.Router();

export interface Product {
    id?: number;
    name: string;
    price: number;
}


productRouter.get('/', async (req, res) => {
    const database = await Db.get();
    database.db.all('select * from product;', async (err, rows) => {
        let list: Product[] = [];
        if (!err) {
            list = rows.map((row) => ({
                id: row.id,
                name: row.name,
                price: row.price
            }));
            res.send(list);
        } else {
            await database.db.exec(`CREATE TABLE IF NOT EXISTS product (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name varchar(50),
                price number
            );`);
            let values: string = '';

            for (let i = 0; i < 100; i++) {
                if (i > 0)
                    values += ','
                values += `('${randomString(10)}', ${randomNumber()})`;
            }
            await database.db.exec(`INSERT INTO product (name, price) VALUES ${values};`)
            database.db.all('select * from product;', (err, rows) => {
                list = rows.map((row) => ({
                    id: row.id,
                    name: row.name,
                    price: row.price
                }));
                res.send(list);
            });
        }
    });
});

productRouter.post('/', async (req, res) => {
    const database = await Db.get();

    const product: Product = {
        name: req.body.name,
        price: req.body.price,
    }
    await database.db.run(`INSERT INTO product (name, price) VALUES (?, ?);`, [
        product.name, product.price
    ]);
    res.send(product);
});

productRouter.put('/:id', async (req, res) => {
    const database = await Db.get();
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
    }
    await database.db.run(`UPDATE product SET name = ?, price = ? WHERE id = ?;`, [
        product.name, product.price, req.params.id
    ]);
    res.send(product);
});


export { productRouter }; 