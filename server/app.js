const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const fs = require('fs');
const join = require('path').join;
const models = join(__dirname, './models');
// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const config = require('./config');
const client = redis.createClient();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const oidc = require('./open-id-connect');

// console.log(models, '<-----here models');


const app = express();

require('./config/passport');

// const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
// const User = mongoose.model('User', userScheme);
 
app.use(express.static(__dirname + "/public"));
 
mongoose.connect("mongodb://localhost:27017/car-exp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});


app.use(session({
  store: new RedisStore({client}),
  secret: config.redisStore.secret,
  resave: true,
  saveUninitialized: false
}));

// app.use(session({
//   secret: 'this should be secure',
//   resave: true,
//   saveUninitialized: false
// }));




// session support is required to use ExpressOIDC
app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));

// const oidc = new ExpressOIDC({
//   issuer: 'https://known-aim-dev-336354/oauth2/default',
//   client_id: '0oa2bwxsorcxXRWzV4x6',
//   client_secret: 'hd_w5Z3zYCAINxGLP2jEXmJwfYIQrVuXhrWMq9EB',
//   redirect_uri: 'http://localhost:3000/',
//   scope: 'openid profile'
// });

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
