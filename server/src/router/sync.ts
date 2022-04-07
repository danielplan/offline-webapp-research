import express from 'express';
import { RequestOptions, request } from 'http';

const syncRouter = express.Router();

interface ClientRequest {
    data: any;
    id: number;
    method: string;
    url: string;
}

syncRouter.post('/', async (req, res) => {
    const requests: ClientRequest[] = req.body;

    const successfulRequests: number[] = [];

    for (let element of requests) {
        try {
            await makeRequest(element);
            successfulRequests.push(element.id);
        } catch (e) {
        }
    }

    res.send({
        result: successfulRequests
    });
});


async function makeRequest(req: ClientRequest): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const url = new URL(req.url);

        const options: RequestOptions = {
            hostname: url.hostname,
            port: url.port,
            protocol: url.protocol,
            path: url.pathname,
            method: req.method,
            headers: { "Content-Type": "application/json" }
        };

        const r = request(options, (res) => {
            res.on('data', d => {
                resolve();
            });
            res.on('error', d => {
                reject('Rejected request');
            });
        });
        r.write(JSON.stringify(req.data));
        r.end();
    });
}

export { syncRouter };