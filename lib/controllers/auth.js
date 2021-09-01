const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/UserServices');
const User = require('../models/User');

const oneDay = 1000 * 60 * 60 * 24;
const makeCookie = (res, user) => {
  res.cookie('session', UserService.authToken(user), {
    httpOnly: true,
    maxAge: oneDay,
    sameStie: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService.create(req.body)
      .then((user) => {
        res.cookie('session', user.auth(), {
          httpOnly: true,
          maxAge: oneDay,
          sameStie: 'none',
          secure: true,
          // sameStie: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
          // secure: process.env.NODE_ENV === 'production',
        });
        // makeCookie(res, user);
        res.send(user.toJSON());
      })
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then((user) => {
        res.cookie('session', user.auth(), {
          httpOnly: true,
          maxAge: oneDay,
          sameStie: 'none',
          secure: true,
          // sameStie: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
          // secure: process.env.NODE_ENV === 'production',
        });
        // makeCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    try {
      // console.log(req);
      res.send(req.user);
      next();
    } catch (err) {
      res.status(500);
      next(err);
    }
  });
