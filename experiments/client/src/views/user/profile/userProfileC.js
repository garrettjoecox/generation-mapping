(() => {
  angular
    .module('skeleton')
    .controller('userProfileC', userProfileC);

  function userProfileC(UsersAPI, user) {
    this.user = user;

    UsersAPI.getAll({ parentId: user.id })
      .then(users => {
        this.users = users;
      })
  }
})();
