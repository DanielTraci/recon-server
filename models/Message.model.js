const mongoose = require('mongoose');

// Message Model Schema
let MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
},
{
  timestamps: true
}
);

let MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
