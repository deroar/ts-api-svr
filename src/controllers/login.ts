import express = require('express');
import * as uuid from 'uuid';
import * as redis from 'redis';
import * as randomJs from 'random-js';

interface SampleObj {
    key: string;
}

const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

export let login = (req: express.Request, res: express.Response) => {
    const token: string = uuid.v4();
    const redisClient: redis.RedisClient = redis.createClient();
    const player_id: string = getPlayerId();
    redisClient.set(player_id, token);

    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({
        token,
        player_id
    });
};

function getPlayerId(): string {
    return 'test_user_' + randomJs.integer(100, 999)(engine);
}