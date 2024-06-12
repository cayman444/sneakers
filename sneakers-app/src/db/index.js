const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routers/authRouter');
const productRouter = require('./routers/productRouter');
const questionRouter = require('./routers/questionRouter');
const orderRouter = require('./routers/orderRouter');

const app = express();
dotenv.config();

const { PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fvgkhsg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/question', questionRouter);
app.use('/order', orderRouter);

const start = async () => {
  try {
    await mongoose.connect(db);
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
