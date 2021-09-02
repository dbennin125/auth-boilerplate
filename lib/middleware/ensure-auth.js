const UserService = require('../services/UserServices');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  // try {
  //   const token = req.cookies.session;
  //   req.user = UserService.verifyAuthToken(token);
  //   next();
  // } catch (err) {
  //   err.status = 401;
  //   next(err);
  // }
  try {
    const { session } = req.cookies;
    // console.log(session);
    const { user } = jwt.verify(session, process.env.APP_SECRET);
    // const payload = jwt.verify(session, process.env.APP_SECRET);
    // console.log('ensure auth user', user);
    // console.log('I am a payload', payload);

    // console.log(verifiedUser);
    req.user = user;
    // console.log('ensure auth req.user', req.user);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
