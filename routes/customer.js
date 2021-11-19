const express = require('express');
const router = express.Router();
const customer = require('../models/customer_model');
const bcrypt = require('bcrypt');


router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    customer.getById(req.params.id, function(err, dbResult) {
      if (err) {
        res.json(err);
        res.send("No user on that id")
      } else {
        console.log(dbResult[0]);
        res.json(dbResult[0]);
      }
    });
  } else {
    customer.get(function(err, dbResult) {
      if (err) {
        res.json(err);
      } else {
        res.json(dbResult);
      }
    });
  }
});


router.post('/register', (req, res) => {
  if('username' in req.body == false ) {
    res.status(400);
    res.json({status: "Missing username from body"})
    return;
  }
  if('password' in req.body == false ) {
    res.status(400);
    res.json({status: "Missing password from body"})
    return;
  }
  console.log(req.body.password);
  const salt = bcrypt.genSaltSync(6);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  console.log(hashedPassword);
  const newBody = { username: req.body.username , password: hashedPassword}
  customer.add(newBody, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      console.log(dbResult);
    }
  });
  res.status(201).json({ status: "created" });
});


router.delete('/:id', 
function(req, res) {
  customer.delete(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult.affectedRows);
    }
  });
});


router.put('/:id', 
function(req, res) {
  customer.update(req.params.id, req.body, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult);
    }
  });
});

module.exports = router;