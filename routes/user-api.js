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
    newUser.username = req.body.username.toLowerCase();
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.password = req.body.password;
    newUser.email = req.body.email.toLowerCase();
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

/* User authentication */
// http://localhost:3000/user-api/authenticate
router.post('/authenticate', function(req, res, next) {
  // Check if username and password was provided
  if (!req.body.username && !req.body.password) {
    console.log('Enter info');
    res.json({ success: false, message: 'No infomation was provided' }); // Return error
    res.redirect('back');
  } else {
    // Check if username exists in db
    const bodyUsername = (req.body.username).toLowerCase();
    userModel.findOne({ username: bodyUsername }) // Check database for username
      .select('email username firstname lastname password')
      .exec(function(err, user) {
      if (err) throw err;
      if (!user) {
        res.send('no fat ass');
        res.status(404).send({msg: 'User does not exist'});
        res.json({
          success: false,
          msg: 'User not found..'
        });
      } else if (user) {
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            msg: 'Could not authenticate password'
          });
        } else {
          res.json({
            success: true,
            msg: 'User authenicated great..',
            user: {
              id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              username: user.username,
              email: user.email
            }
          });
        }
      }
  
    });
  }

});

module.exports = router; 
// Github reference && guide
// https://github.com/kingsolo50/MEAN-Stack-With-Angular-2-Tutorial/blob/master/routes/authentication.js 