let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: { type: String },
  content: { type: String }
});

let Question = mongoose.model("Question", questionSchema, "faqQuestions");
module.exports = Question;
