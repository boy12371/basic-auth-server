var app = require('express')();
var basicAuth = require('basic-auth');
var port = process.env.PORT || 3000;
var USERNAME = 'user';
var PASSWORD = 'pass';

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name ===  USERNAME && user.pass === PASSWORD) {
    return next();
  } else {
    return unauthorized(res);
  };
};

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/', auth, function (req, res) {
  res.status(200).send('Authenticated');
});


app.listen(port, console.log);