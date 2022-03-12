import express from 'express';
const synchRouter = express.Router();

synchRouter.patch('/', async (req, res) => {
    const requests: any = req.body;
    const successfulRequests: number[] = [];
    requests.forEach(async (element: any) => {
        /*const result = await fetch(element.url, {
            method: element.method,
            body: element.data,
            headers: { "Content-Type": "application/json" }
        });
        if (result.ok) {
            successfulRequests.push(element.id);
        }*/
    });
    res.send(successfulRequests);
});

export { synchRouter };