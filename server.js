import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import config from './config/default';
import router from './router/main.js';
import mongoose from "mongoose";



const db = mongoose.connection;
db.on('error', (err) => {
    console.log('[DBERR]' + err)
});
db.once('open', () => {
    console.log("Connected to mongod server");
});
mongoose.connect(`mongodb://${config.db.host}/${config.db.database}`);



const app = express();

app.use(express.static('public'));

const server = app.listen(config.port, () => {
    console.log("listening on port " + config.port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$RTMSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use('/', router);