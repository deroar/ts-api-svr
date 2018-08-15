import express from 'express';
import * as login from './controllers/login';
import * as user from './controllers/user';
const app = express();

app.get('/', login.index);
app.get('/user', user.get);
app.get('/user_profile', user.getProfile);

export default app;