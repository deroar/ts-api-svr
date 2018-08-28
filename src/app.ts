import express from 'express';
import * as jwt from './common/jwt_management';
import * as login from './controllers/login';
import * as user from './controllers/user';
import * as guild from './controllers/guild';
import * as bodyParser from 'body-parser';

const app = express();

/**
 * ミドルウェア
 */
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// トークン ＆ ユーザ情報の取得
app.get('/login', login.login);

// 以下はトークン認証が必要
app.get('/user', jwt.requireToken, user.get);
app.get('/user/create', jwt.requireToken, user.get);
app.post('/user/name/update', jwt.requireToken, user.updateName);
app.post('/user/exp/update', jwt.requireToken, user.updateExp);
app.post('/guild/create', jwt.requireToken, guild.create);
app.post('/guild/member/add', jwt.requireToken, guild.addMember);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500);
});

export default app;