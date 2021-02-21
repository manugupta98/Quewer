const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

authRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

authRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = authRouter;