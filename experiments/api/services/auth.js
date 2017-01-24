
const passport = require('passport');
const passportJwt = require('passport-jwt');

const strategy = new passportJwt.Strategy({
  secretOrKey: app.config.jwt.secret,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader()
}, (payload, done) => {
  app.db.user.findById(payload.id)
    .then(user => {
      if (user) done(null, user.get());
      else done(new Error(`Invalid User ID: ${payload.id}`), null);
    });
});

passport.use(strategy);

module.exports = {
  initialize: () => passport.initialize(),
  authenticate: (req, res, next) => {
    passport.authenticate('jwt', app.config.jwt.config, (err, user) => {
      if (!user) return res.sendStatus(401);
      else if (err) return res.sendStatus(500);
      else {
        req.user = user;
        next();
      }
    })(req, res, next);
  }
}