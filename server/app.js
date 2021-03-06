const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const article = require('./routes/article')

const mongoose = require('mongoose')
const app = express();
require('dotenv').config()
const userdb = process.env.USERDB
const passdb = process.env.PASSDB

mongoose.connect(`mongodb://${userdb}:${passdb}@ds061464.mlab.com:61464/hacktivpress`, (err) => {
  if(err) {
    console.log(`failed to connect database`)
  } else {
    console.log(`successfuly connected to database`)
  }
});

const db = mongoose.connection
db.on('error',console.error.bind(console,'connection to db error:'))
db.once('open', function(){
    console.log('connected to db')
})
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', article);
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
