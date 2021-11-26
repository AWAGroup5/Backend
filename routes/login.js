var express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');


//EXAMPLE FOR PROTECTED ADDRESS WITH JWT
router.post('/customer', passport.authenticate('user', { session: false }), (req, res) => {
  const payload = {
    user: {
      id: req.user.id,
      username: req.user.username,
      isManager: false
    }
  }
  const secretKey = (process.env.SECRET_KEY || "joulupukki");
  const options = {
    expiresIn: '1d'
  }
  const generatedToken = jwt.sign(payload, secretKey, options)

  res.json({ jwt: generatedToken })
});

router.post('/manager', passport.authenticate('manager', { session: false }), (req, res) => {
  const payload = {
    user: {
      id: req.user.id,
      username: req.user.username,
      isManager: true
    }
  }
  const secretKey = (process.env.SECRET_KEY || "joulupukki");
  const options = {
    expiresIn: '1d'
  }
  const generatedToken = jwt.sign(payload, secretKey, options)

  res.json({ jwt: generatedToken })
});

router.get('/jwtprotected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send("success");
})

module.exports = router;