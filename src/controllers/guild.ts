import * as express from 'express';
import * as uuid from 'uuid';
import randomJs from 'random-js';
import { MysqlWrapper } from '../common/mysql_wrapper';
import Guild from '../models/guild';

const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

export let create = (req: express.Request, res: express.Response) => {
    const userId = req.body.userId;
    const register = {
        guildId: uuid.v4(),
        userId: userId,
        role: 1,
    };

    const sequelize = MysqlWrapper.getInstance();

    Promise.resolve()
    .then(() => sequelize.addModels([Guild]))
    .then(() => sequelize.sync())
    .then(() => {
        const new_guild: Guild = new Guild({
            guildId: register.guildId,
            userId: register.userId,
            role: register.role,
        });
        return new_guild.save();
    })
    .then(() => {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(register);
    })
    .catch((error) => {
        console.log(error);
    });
};

export let addMember = (req: express.Request, res: express.Response) => {
    const guildId = req.body.guildId;
    const userId = req.body.userId;

    const sequelize = MysqlWrapper.getInstance();

    Promise.resolve()
    .then(() => sequelize.addModels([Guild]))
    .then(() => sequelize.sync())
    .then(() => {
        const new_guild: Guild = new Guild({
            guildId: guildId,
            userId: userId,
            role: 0,
        });
        return new_guild.save();
    })
    .then(() => {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send({error: 0});
    })
    .catch((error) => {
        console.log(error);
    });
};

