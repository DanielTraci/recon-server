// Handling POST requests to http:localhost:5005/api/contact
const express = require('express')
const router = express.Router()
let MessageModel = require('../models/Message.model')
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")

// route
router.post('/contact', cors(), async (req, res) => {
     const { name, email, subject, message } = req.body
     const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
     if (!myRegex.test(email)) {
          
          res.status(500).json({
               errorMessage: 'Email format was not correct'
          });
          return;
     }

     // Stores the message in the DB
     MessageModel.create({ name, email, subject, message })
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
                    res.status(500).json({
                    error: 'Email format not correct',
                    message: err
               })
          })

     // Sends the message to email
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
          subject: `${name}: ${subject}`,
          html: `<div>
               <h3><b>Subject:</b> ${subject}</h3>          
               <p><b>From:</b> ${name}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Message:</b> ${message}</p>
               </div>`
     })
})

module.exports = router;
