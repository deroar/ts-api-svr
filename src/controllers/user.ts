import * as express from 'express';
import * as uuid from 'uuid';
import * as randomJs from 'random-js';
import { MysqlWrapper } from '../common/mysql_wrapper';
import User from '../models/user';


const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

export let create = (req: express.Request, res: express.Response) => {
    const result = {
        userId: uuid.v4(),
        name: 'test_user_' + randomJs.integer(100, 999)(engine),
        exp: 0,
    };

    const sequelize = MysqlWrapper.getInstance('user');

    sequelize.sync()
    .then(() => {
        const new_user: User = new User({
            userId: result.userId,
            name: result.name,
            exp: 0,
        });
        return new_user.save();
    })
    .then(() => {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    });
};

export let get = (req: express.Request, res: express.Response) => {
    const sequelize = MysqlWrapper.getInstance('user');

    sequelize.sync()
    .then(() => {
        User.findByPrimary(req.query.userId)
        .then((result) => {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(result);
        });
    });
};

export let updateName = (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId;
    const name: string = req.body.name;

    const sequelize = MysqlWrapper.getInstance('user');
    User.update({ name }, { where: { userId } })
    .then(() => sequelize.sync())
    .then(() => {
        return User.findByPrimary(req.query.userId)
        .then((result) => {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(result);
        });
    });
};

export let updateExp = (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId;
    const incExp: number = req.body.exp || randomJs.integer(1, 100)(engine);

    const sequelize = MysqlWrapper.getInstance('user');
    User.update({ exp: sequelize.literal(`exp + ${incExp}`) }, { where: { userId } })
    .then(() => sequelize.sync())
    .then(() => {
        return User.findByPrimary(req.query.userId)
        .then((result) => {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(result);
        });
    });
};