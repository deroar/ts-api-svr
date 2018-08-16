import * as os from 'os';
import * as http from 'http';
import app from './app';

const port: number = Number(process.env.port) || 3000;
const server = http.createServer(app);

// HTTPサーバーの起動
server.listen(port, () => {
    const hostName: string = process.env.HOSTNAME || os.hostname() || '';
    console.log(`server listen on ${hostName}:${port}`);
});