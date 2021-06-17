const { Schema, model } = require("mongoose");

// Message Model Schema

const MessageSchema = new Schema({
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
  /*uploads: [String],
  businessInquiry: Boolean,
  bugReport: Boolean,
  feedback: Boolean,*/
},
{
  timestamps: true
}
);

const MessageModel = model("Message", MessageSchema);

module.exports = MessageModel;
