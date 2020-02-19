const express = require('express');
const mongoose = require('mongoose');
// const { wrap: async } = require('co');
const User = mongoose.model('User');
const router = express.Router();
const oidc = require('../open-id-connect');

/* GET users listing. */
router.get('/:userId', oidc.ensureAuthenticated(), function(req, res, next) {



  // var user = new User();

  // user.name = 'John';
  // user.email = 'john@dir.com';
  // user.setPassword(req.body.user.password);

  // user.save();
  // console.dir(User.find, '<-----here User load');
  const criteria = { _id: req.params.userId };
  // req.profile =
  User.findById(req.params.userId).then( v => console.log(v, '<-----here'));

  if (req.userContext.userinfo) {
    res.send(`Hi ${req.userContext.userinfo.name}!`);
  } else {
    res.send('Hi!');
  }
  // res.send('respond with a resource');
});

module.exports = router;
