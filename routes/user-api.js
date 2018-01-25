var express = require('express');
var userModel = require('../model/model-user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
 
/* User sign up / Register */
// http://localhost:3000/user-api/register
router.post('/register', (req, res, next) => {
  console.log('New user data sent to mongo...');
  let newUser = new userModel(); /* Creating user */
  newUser.username = req.body.username;
  newUser.firstname = req.body.firstname;
  newUser.lastname = req.body.lastname;
  newUser.password = req.body.password;
  newUser.email = req.body.email;
  if (req.body.username === null ||
      req.body.username == '' ||
      req.body.firstname === null ||
      req.body.firstname == '' ||
      req.body.lastname === null ||
      req.body.lastname == '' ||
      req.body.password === null ||
      req.body.password == '' ||
      req.body.email === null ||
      req.body.email == ''
  ) {
    res.send('Please ensure you have field in all the FIELDS!!')
  } else {
    newUser.save((err) => {
      if (err) {
        res.send('Username and email already exists');
        // res.send(err); // Uncomment to see err
      } else {
        res.send('User created.. Good job..Msg from ME');
      }
    });
  }
  console.log(newUser);
});

module.exports = router; 
