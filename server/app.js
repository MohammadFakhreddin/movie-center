const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const AdminRoute = require('./routes/api/admin');
const UserRoute = require('./routes/api/user')
const MovieRoute = require('./routes/api/movie')
const config = require('./config');
const StatusCodes = require('./utils/status_codes')
// const Multer = require('multer')

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.valid_origin_address);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,movie_center");
  next();
}); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/api/admin',AdminRoute);
app.use('/api/user',UserRoute)
app.use('/api/movies',MovieRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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