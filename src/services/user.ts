import * as uuid from 'uuid';
import randomJs from 'random-js';
import { MysqlWrapper } from '../common/mysql_wrapper';
import User from '../models/user';
import * as accountService from '../services/account';


const engine: randomJs.Engine = randomJs.engines.mt19937().autoSeed();

export const createUser = (name) => {
    const result = {
        userId: uuid.v4(),
        name: 'test_user_' + randomJs.integer(100, 999)(engine),
        exp: 0,
    };

    const sequelize = MysqlWrapper.getInstance();

    return Promise.resolve()
    .then(() => sequelize.addModels([User]))
    .then(() => sequelize.sync())
    // account テーブルの userIdを更新する
    .then(() => accountService.updateUserId(name, result.userId))
    .then(() => {
        const new_user: User = new User({
            userId: result.userId,
            name: result.name,
            exp: 0,
        });
        return new_user.save();
    });
};

export const get = (userId: string) => {
    const sequelize = MysqlWrapper.getInstance();

    return Promise.resolve()
    .then(() => sequelize.addModels([User]))
    .then(() => sequelize.sync())
    .then(() => User.findByPrimary(userId));
};