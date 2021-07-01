const express = require('express')
const router = express.Router()
let MessageModel = require('../models/Message.model')


// will handle all POST requests to http:localhost:5005/api/contact

router.post('/contact', (req, res) => {  
  const {name, email, message} = req.body //uploads
  // businessInquiry: Boolean, bugReport: Boolean, feedback: Boolean,
  console.log(req.body)
  MessageModel.create({name, email, message}) //uploads: uploads
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             res.status(500).json({
                  error: 'Something went wrong',
                  message: err
             })
        })  
})

module.exports = router;
