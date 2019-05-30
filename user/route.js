import { Router } from 'express';
import bodyChecker from '../lib/bodyChecker';
import { list, create } from './controller';

export default Router()
    .get('/', (req, res) => { res.send('hello world!') })
    .get('/list', list)
    .post('/addUser/', bodyChecker(['username', 'name', 'password'],[]), create)