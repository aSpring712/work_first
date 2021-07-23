const express = require('express');
const userRouter = require('./routes/user.js');
const boardRouter = require('./routes/board.js');
const app = express();

app.post('/')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('static/uploads'))
app.use('/user', userRouter);
app.use('/board', boardRouter);

module.exports = app;