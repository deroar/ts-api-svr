import express from 'express';
import * as login from './controllers/login';
import * as user from './controllers/user';
const app = express();

app.get('/', login.login);
app.get('/user', user.get);
app.get('/user/create', user.create);
app.get('/user/profile', user.getProfile);
app.get('/user/exp', user.getExp);

export default app;