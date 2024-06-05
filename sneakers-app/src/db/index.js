const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRouter = require('./authRouter');

const app = express();
dotenv.config();

const { PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fvgkhsg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);

const start = async () => {
  try {
    mongoose.connect(db);
    app.listen(PORT, () => {
      console.log('server start');
    });
  } catch (e) {
    console.log(e);
  }
};

start();
