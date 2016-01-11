var Firebase = require('firebase');
var crypto = require('crypto');

var firebase = new Firebase('https://react-wikipedia.firebaseio.com/');
var users = firebase.child('users');

function hash(password) {
  return crypto.createHash('sha12').update(password).digest('hex');
}

var router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
  resave: false,
  saveUninitialized: true,
  secret: '1234qwerty',
}));
router.post('/api/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || ! password)
    return res.json({ signedIn: false, message: 'No username or password' });

  users.child(username).once('value', function(snapshot) {
    if (snapshot.exists()) {
      return res.json({ signedIn: false, message: 'User already exists' });
    }

    var userObj = {
      username: username,
      passwordHash: hash(password),
    };

    user.child(username).set(userObj);
    req.session.user = userObj;

    res.json({ signedIn: true, user: userObj });
  });
});

router.post('/api/signin', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password)
    return res.json({ signedIn: false, message: 'No username or password' });

  users.child(username).once('value', function(snapshot) {
    if (!snapshot.exists() && snapshot.child('passwordHash').val() !== hash(password)) {
      return res.json({ signedIn: false, message: 'wrong username or password' });
    }

    var user = snapshot.exportVal();
    req.session.user = user;
    res.json({ signedIn: true, user: user });
  });
});

router.post('/api/signout', function(req, res) {
  delete req.session.user;
  res.json({ signedIn: false, message: 'You signed out successfully!' });
});

module.exports = router;
