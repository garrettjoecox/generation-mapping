(() => {
  angular
    .module('skeleton')
    .controller('homeC', homeC);

  function homeC(UsersAPI) {
    UsersAPI.getAll()
      .then(users => {
        this.users = users;
      })
  }
})();
