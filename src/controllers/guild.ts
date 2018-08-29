import * as express from 'express';
import * as uuid from 'uuid';
import { MysqlWrapper } from '../common/mysql_wrapper';
import Guild from '../models/guild';
import User from '../models/user';
import * as userService from '../services/user';

export let create = (req: express.Request, res: express.Response) => {
    const userId = req.body.userId;
    const guildId = uuid.v4();
    const register = {
        guildId: guildId,
        userId: userId,
        role: 1,
    };

    const sequelize = MysqlWrapper.getInstance();

    Promise.resolve()
    .then(() => sequelize.addModels([Guild, User]))
    .then(() => sequelize.sync())
    .then(() => {
        const new_guild: Guild = new Guild({
            guildId: register.guildId,
            userId: register.userId,
            role: register.role,
        });
        return Promise.resolve()
        .then(() => {
            return sequelize.transaction(async (tx) => {
                await User.update({ guildId }, { where: { userId }, transaction: tx });
                await new_guild.save({ transaction: tx});
            });
        });
    })
    .then(() => sequelize.sync())
    .then(() => Guild.findByPrimary(guildId))
    .then((result) => {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(result.dataValues);
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

