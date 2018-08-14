/**
 * @file サーバー起動スクリプト。
 *
 * ゲームサーバー起動時はこのファイルを実行する。
 */
import "reflect-metadata";
import * as os from 'os';
import * as http from 'http';
import * as config from 'config';
 
// HTTPサーバーの用意
const server = http.createServer(app);
 
// HTTPサーバーの起動
server.listen(process.env.PORT || '3000', () => {
	const hostName = process.env.HOSTNAME || os.hostname() || '';
	log4js.getLogger('debug').info(`${hostName}: Worker: pid=${process.pid} up`);
});