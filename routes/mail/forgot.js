const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
const emailTemplates = require('email-templates');
const User = require('../../models/Users')
const async = require('async');
const crypto = require('crypto');

router.post('/', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ username: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'metrocurb@yahoo.com',
                pass: 'CodingBootcamp'
            }
        });
        var mailOptions = {
          to: 'lynam.chris@gmail.com',
          from: 'metrocurb@yahoo.com',
          subject: 'Metro Curbside Cleaning Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
        //   req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      window.location.href = "/Login";
    });
  });

  module.exports = router;