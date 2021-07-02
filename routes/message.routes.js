// Handling POST requests to http:localhost:5005/api/contact
const express = require('express')
const router = express.Router()
let MessageModel = require('../models/Message.model')
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")

router.post('/contact', cors(), async (req, res) => {
     const { name, email, message } = req.body //uploads
     // bugReport: Boolean,  businessInquiry: Boolean,  generalSubject: Boolean,
     console.log(req.body)
     const transport = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          auth: {
               user: process.env.MAIL_USER,
               pass: process.env.MAIL_PASS
          }
     })
     await transport.sendMail({
          from: process.env.MAIL_FROM,
          to: "test@test.com",
          subject: `${name} sent a message`,
          html: `<div>
          <h3> ${name} sent a message</h3>
          <p><b>From:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
          </div>`
     })

     // Stores the message in the DB
     MessageModel.create({ name, email, message }) //uploads: uploads
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
