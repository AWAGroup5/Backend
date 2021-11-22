const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const manager = require('../models/manager_model');
const customer = require('../models/customer_model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;


module.exports = function(passport) {
    passport.use(new BasicStrategy(
        function(username, password, done) {
            
            const user = customer.getByName(username, function(err,result) {
            if (err) {
                res.json(err);
                res.send("No user on that username")
            } else {

                if(user == undefined) {
                    // Username not found
                    console.log("HTTP Basic username not found");
                    return done(null, false, { message: "HTTP Basic username not found" });
                }
                console.log(bcrypt.compareSync(password, result[0].password))

                if(bcrypt.compareSync(password, result[0].password) == false) {
                    // Password does not match
                    console.log("HTTP Basic password not matching username");
                    return done(null, false, { message: "HTTP Basic password not found" });
                }
                return done(null, user);
            }
          })
        }
    ));
}
