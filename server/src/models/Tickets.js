const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = mongoose.model("User");

const ticketSchema = new Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String, default: "New" },
  date: { type: Date, default: Date.now },
  author: { type: Schema.ObjectId, ref: "User" }
});

let Ticket = mongoose.model("Ticket", ticketSchema, "tickets");
module.exports = Ticket;
