const express = require('express');
const app = express();
const userRouter = require('./routes/user.js');
const boardRouter = require('./routes/board.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('/board', boardRouter);

module.exports = app;