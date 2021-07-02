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
  message: {
    type: String,
    required: true
  },
  bugReport: Boolean,
  businessInquiry: Boolean,
  generalSubject: Boolean,
},
{
  timestamps: true
}
);

let MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
