import * as redis from 'redis-promisify';

export class RedisWrapper {
    static getClient() {
        return redis.createClient({
            host: '127.0.0.1',
            port: 6379,
            db: 0,
        });
    }
}