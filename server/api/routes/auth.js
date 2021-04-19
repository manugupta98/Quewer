const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

authRouter.get('/auth/google',(req, res, next) => {
  res.cookie('google-login-redirect-url', req.query.uri);
  next();
}, passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }));

authRouter.get('/auth/google/callback', 
  passport.authenticate('google'), (req, res) => {
    var redirectURL = req.cookies['google-login-redirect-url'];
    res.clearCookie('google-login-redirect-url');
    if (redirectURL){
      res.redirect(redirectURL);
    }else{
      res.redirect('/');
    }
  });

module.exports = authRouter;