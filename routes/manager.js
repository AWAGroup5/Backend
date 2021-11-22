const express = require('express');
const router = express.Router();
const manager = require('../models/manager_model');
const bcrypt = require('bcrypt');

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    manager.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult[0]);
        response.json(dbResult[0]);
      }
    });
  } else {
    manager.get(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
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
  const salt = bcrypt.genSaltSync(6);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const newBody = { username: req.body.username , password: hashedPassword}
  manager.add(newBody, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      console.log(dbResult);
    }
  });
  res.status(201).json({ status: "created" });
});


router.delete('/:id', 
function(request, response) {
  manager.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult.affectedRows);
    }
  });
});


router.put('/:id', 
function(request, response) {
  manager.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;