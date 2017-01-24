
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

module.exports = {

  signup(req, res) {
    if (!req.body.email || !req.body.password || !req.body.inviteToken) return res.sendStatus(400);
    return app.db.user
      .findOne({ where: { inviteToken: req.body.inviteToken } })
      .then(user => {
        // ToDo, fix these conditons for multiple head accounts
        if (!user) {
          if (req.body.inviteToken !== app.config.masterToken) return res.sendStatus(400);
          else {
            req.body.displayName = 'Head Account';
            return app.db.user.create(req.body)
              .then(user => {
                return res.sendStatus(200);
              });
          }
        } else {
          if (user.email && user.password) return res.sendStatus(400);
          user.password = req.body.password;
          user.email = req.body.email;
          console.log('saving');
          return user.save()
            .then(user => {
              return res.sendStatus(200);
            });
        }
      })
      .catch(e => {
        log.error(e);
        return res.sendStatus(500);
      });

  },

  login(req, res) {
    if (!req.body.email || !req.body.password) return res.sendStatus(400);
    return app.db.user
      .findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) return res.sendStatus(400);
        return new Promise(resolve => bcrypt.compare(req.body.password, user.password, (err, result) => resolve(result)))
          .then(result => {
            if (!result) return res.sendStatus(400);
            else {
              const token = jwt.encode({ id: user.id }, app.config.jwt.secret);
              res.json({ token });
            }
          })
      })
      .catch(e => {
        log.error(e);
        return res.sendStatus(500);
      })
  },

  authenticated(req, res) {
    if (!req.user) return res.send(false);
    else return res.json(req.user);
  }

};
