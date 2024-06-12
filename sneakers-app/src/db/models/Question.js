const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema(
  {
    userName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
  },
  { versionKey: false }
);

const Question = model('Question', questionSchema);

module.exports = Question;
