import express = require('express');
import * as crypto from 'crypto';
import * as userService from '../services/user';
import Account from '../models/account';
import { generateToken } from '../common/jwt_management';
import { MysqlWrapper } from '../common/mysql_wrapper';

export let login = (req: express.Request, res: express.Response) => {
    const name: string = req.query.name;
    const password: string = req.query.password;
    if (!(name && password)) {
        res.sendStatus(400);
    }

    const sequelize = MysqlWrapper.getInstance();
    let hash: string = '';

    Promise.resolve()
    .then(() => sequelize.addModels([Account]))
    .then(() => sequelize.sync())
    .then(() => {
        hash = crypto.randomBytes(8).toString('hex');
        // account table へのレコード作成 or 取得
        return Account.findOrCreate({where: { name }, defaults: { password, userId: '', hash }});
    })
    .then((result) => {
        // 新規作成の場合
        if (result[1]) {
            return userService.createUser(result[0].name);
        }
        // 既存ユーザの場合
        return userService.get(result[0].userId);
    })
    .then((user) => {
        // アクセス用トークンの発行
        const token = generateToken(hash);
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send({
            token: token,
            userId: user.userId,
            userName: user.name,
            userExp: user.exp,
        });
    });
};