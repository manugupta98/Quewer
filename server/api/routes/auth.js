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
    if (redirectURL !== 'undefined'){
      res.redirect(redirectURL);
    }else{
      let url = process.env.CLIENT_URL;
      if (req.user.type === 'admin'){
        res.redirect(url + '/admin');
      }
      else {
        res.redirect(url + '/main');
      }
    }
  });

module.exports = authRouter;