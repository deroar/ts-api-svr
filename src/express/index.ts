import express from 'express';
import * as indexController from './controllers/index';
const app = express();

app.get('/', indexController.index);

export default app;