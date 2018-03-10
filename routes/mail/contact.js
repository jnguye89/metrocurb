const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
const emailTemplates = require('email-templates');

router.post('/', function(req, res) {
    console.log("**************start req************\n" +JSON.stringify(req.body)+"end---end---end---end");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'metrocurb@yahoo.com',
            pass: 'CodingBootcamp'
        }
    });

    let htmlContent = '<h1>New Customer Information Request</h1>' +
        '<p><strong>Name: </strong>' + req.body.name + '</p>' +
        '<p><strong>Phone: </strong>' + req.body.phone + '</p>' +
        '<p><strong>Email: </strong>' + req.body.email + '</p>' +
        '<p><strong>Message: </strong></p>' +
        '<p>' + req.body.comment + '</p>';

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Metro Curbside Website" <metrocurb@yahoo.com>', // sender address
        to: 'lynam.chris@gmail.com', // list of receivers
        subject: 'New Contact Request From metrocurb.com!', // Subject line
        html: htmlContent // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return res.json({ msg: 'Message has been sent.' })
    });
});

module.exports = router