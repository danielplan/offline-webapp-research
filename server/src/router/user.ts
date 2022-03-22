import express from "express";
import { Db } from "../database";

const userRouter = express.Router();

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
}

userRouter.get("/", async (req, res) => {
    const database = await Db.get();
    database.db.all("select * from user", async (err, rows) => {
        let list: User[] = [];
        if (!err) {
            list = rows.map((row) => ({
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                username: row.username,
                phoneNumber: row.phoneNumber,
            }));
            res.send(list);
        } else {
            await database.db.exec(`CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName varchar(50),
                lastName varchar(50),
                username varchar(50),
                phoneNumber varchar(50)    
            );`);

            database.db.all("select * from user;", (err, rows) => {
                list = rows.map((row) => ({
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    username: row.username,
                    phoneNumber: row.phoneNumber,
                }));
                res.send(list);
            });
        }
    });
});

userRouter.post("/", async (req, res) => {
    const database = await Db.get();

    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
    };
    await database.db.run(
        `INSERT INTO user (firstName, lastName, username, phoneNumber) VALUES (?, ?, ?, ?);`,
        [user.firstName, user.lastName, user.username, user.phoneNumber]
    );
    res.send(user);
});

userRouter.put("/:id", async (req, res) => {
    const database = await Db.get();
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
    };
    await database.db.run(
        `UPDATE user SET firstname = ?, lastname = ?, username = ?, phoneNumber = ? WHERE id = ?;`,
        [user.firstName, user.lastName, user.username, user.phoneNumber]
    );
    res.send(user);
});

export { userRouter };
