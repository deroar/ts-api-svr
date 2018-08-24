import express from 'express';
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


app.get('/', login.login);
app.get('/user', user.get);
app.get('/user/create', user.create);
app.post('/user/name/update', user.updateName);
app.post('/user/exp/update', user.updateExp);
app.post('/guild/create', guild.create);
app.post('/guild/member/add', guild.addMember);

export default app;