/*App feito seguindo o tutorial no ebook gratuito https://academy.umbler.com/node-js-para-iniciantes/*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*"settando" os arquivos de rota 
(repare  que o arquivo de rota define o que enviar, entao ele que define qual view mandar)*/
var indexRouter = require('./routes/index');
var newRouter = require('./routes/new');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Utilizando a rota com base no que veio na URL
app.use('/', indexRouter);
app.use('/new', newRouter);

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
