import * as express from 'express';
import * as uuid from 'uuid';
import * as randomJs from 'random-js';

interface User {
    userId: string;
    userName: string;
    userExp: number;
}

interface UserProfile {
    userId: string;
    userRank: number;
}

const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

export let get = (req: express.Request, res: express.Response) => {
    const result: User  = {
        userId: uuid.v4(),
        userName: 'test_user_' + randomJs.integer(100, 999)(engine),
        userExp: randomJs.integer(1, 1000)(engine),
    };
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(result);
};

export let getProfile = (req: express.Request, res: express.Response) => {
    const result: UserProfile  = {
        userId: uuid.v4(),
        userRank: 1,
    };
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(result);
};