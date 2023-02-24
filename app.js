require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', [routes]);

app.listen(PORT, () => {
  console.log(`서버가 실행되었습니다.`);
});