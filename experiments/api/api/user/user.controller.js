
module.exports = {

  create(req, res) {
    if (!req.body.displayName) return res.sendStatus(400);
    delete req.body.password;
    req.body.parentId = req.user.id;
    app.db.user.create(req.body)
      .then(user => {
        res.send(user.get());
      })
  },

  retrieveAll(req, res) {
    app.db.user.findAll(req.query ? {where: req.query} : {})
      .then(users => {
        res.json(users);
      })
      .catch(e => {
        log.error(e);
        res.sendStatus(500);
      })
  },

  retrieve(req, res) {
    app.db.user.findById(req.params.id)
      .then(user => {
        user = user.get();
        if (!user.parentId) return user;
        else return app.db.user.findById(user.parentId)
          .then(parent => user.parent = parent)
          .then(() => user);
      })
      .then(user => {
        res.json(user);
      })
      .catch(e => {
        log.error(e);
        res.sendStatus(500);
      });
  },

  update(req, res) {

  },

  destroy(req, res) {

  },

};
