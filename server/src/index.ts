import { createServer } from './server';
import http from 'http';
import { AddressInfo } from 'net';

const port = 3000;
const host = 'localhost';

const startServer = async () => {
    const app = await createServer();

    const server = http.createServer(app).listen({ host, port }, () => {
        const addressInfo = server.address() as AddressInfo;
        console.log(`Server started at http://${addressInfo.address}:${addressInfo.port}/`);
    });
}

startServer();