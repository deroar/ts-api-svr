import * as express from 'express';
import * as uuid from 'uuid';
import * as randomJs from 'random-js';
import { MysqlWrapper } from '../common/mysql_wrapper';
import User from '../models/user';

interface UserProfile {
    id: string;
    rank: number;
}

const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

export let create = (req: express.Request, res: express.Response) => {
    const result = {
        id: uuid.v4(),
        name: 'test_user_' + randomJs.integer(100, 999)(engine),
        exp: 0,
    };

    const sequelize = MysqlWrapper.getInstance('user');

    Promise.resolve()
    .then(() => sequelize.addModels([User]))
    .then(() => sequelize.sync())
    .then(() => {
        const new_user: User = new User({
            id: result.id,
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
    Promise.resolve()
    .then(() => {
        const sequelize = MysqlWrapper.getInstance('user');
        return sequelize.addModels([User]);
    })
    .then(() => {
        User.findByPrimary(req.query.id)
        .then((result) => {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(result);
        });
    });
};

export let updateName = (req: express.Request, res: express.Response) => {
    const id: string = req.body.id;
    const name: string = req.body.name;

    console.log(id, name);

    const sequelize = MysqlWrapper.getInstance('user');
    Promise.resolve()
    .then(() => sequelize.addModels([User]))
    .then(() => User.update({ name }, { where: { id } }))
    .then(() => sequelize.sync())
    .then(() => {
        return User.findByPrimary(req.query.id)
        .then((result) => {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(result);
        });
    });
};

export let updateExp = (req: express.Request, res: express.Response) => {
    const id: string = req.query.id;

};