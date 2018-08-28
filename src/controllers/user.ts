import * as express from 'express';
import * as uuid from 'uuid';
import * as randomJs from 'random-js';
import { MysqlWrapper } from '../common/mysql_wrapper';
import User from '../models/user';


const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

export let get = (req: express.Request, res: express.Response) => {
    console.log(req.query);
    const sequelize = MysqlWrapper.getInstance();

    return Promise.resolve()
    .then(() => sequelize.addModels([User]))
    .then(() => sequelize.sync())
    .then(() => User.findByPrimary(req.query.userId))
    .then((result) => {
        console.log(result.dataValues);
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(result.dataValues);
    });
};

export let updateName = (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId;
    const name: string = req.body.name;

    const sequelize = MysqlWrapper.getInstance();

    Promise.resolve()
    .then(() => sequelize.addModels([User]))
    .then(() => sequelize.sync())
    .then(() => User.update({ name }, { where: { userId } }))
    .then(() => sequelize.sync())
    .then(() => {
        return User.findByPrimary(req.query.userId)
        .then((result) => {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(result.dataValues);
        });
    });
};

export let updateExp = (req: express.Request, res: express.Response) => {
    const userId: string = req.body.userId;
    const incExp: number = req.body.exp || randomJs.integer(1, 100)(engine);

    const sequelize = MysqlWrapper.getInstance();
    Promise.resolve()
    .then(() => sequelize.addModels([User]))
    .then(() => sequelize.sync())
    .then(() => User.update({ exp: sequelize.literal(`exp + ${incExp}`) }, { where: { userId } }))
    .then(() => sequelize.sync())
    .then(() => {
        return User.findByPrimary(req.query.userId)
        .then((result) => {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(result.dataValues);
        });
    });
};