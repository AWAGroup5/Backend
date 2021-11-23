const bcrypt = require('bcrypt');
const manager = require('./models/manager_model');
const customer = require('./models/customer_model');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function(passport) {
    //CUSTOMER
    passport.use('user', new BasicStrategy(
        function(username, password, done) {
            
            const user = customer.getByName(username, function(err, result) {
            if (err) {
                res.json(err);
            } else if (result.length > 0){

                if(user == undefined) {
                    // Username not found
                    console.log("HTTP Basic username not found");
                    return done(null, false, { message: "HTTP Basic username not found" });
                }

                if(bcrypt.compareSync(password, result[0].password) == false) {
                    console.log("HTTP Basic password not matching username");
                    return done(null, false, { message: "HTTP Basic password not found" });
                }
                const customer = { id: result[0].idcustomer, username: result[0].userName }
                return done(null, customer);
            }
            else {
                console.log("No user on that username") 
                return done(null, false, { message: "No matching username" });
            }
          })
        }
    ));

    //MANAGER
    passport.use('manager', new BasicStrategy(
        function(username, password, done) {
            
            const user = manager.getByName(username, function(err, result) {
            if (err) {
                res.json(err);
            } else if (result.length > 0){

                if(user == undefined) {
                    // Username not found
                    console.log("HTTP Basic username not found");
                    return done(null, false, { message: "HTTP Basic username not found" });
                }

                if(bcrypt.compareSync(password, result[0].password) == false) {
                    console.log("HTTP Basic password not matching username");
                    return done(null, false, { message: "HTTP Basic password not found" });
                }
                const customer = { id: result[0].idmanager, username: result[0].userName }
                return done(null, customer);
            }
            else {
                console.log("No user on that username") 
                return done(null, false, { message: "No matching username" });
            }
          })
        }
    ));


    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: (process.env.SECRET_KEY || "joulupukki")
    }

    passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        console.log('JWT valid')
        console.log('Payload: ')
        console.log(jwt_payload)

        done(null, jwt_payload);
    }))
}
