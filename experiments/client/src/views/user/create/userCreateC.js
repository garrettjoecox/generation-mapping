(() => {
  angular
    .module('skeleton')
    .controller('userCreateC', userCreateC);

  function userCreateC(UsersAPI, $state) {
    this.create = (form) => {
      UsersAPI.create(form)
        .then(res => $state.go('userProfile', { id: res.id }));
    }
  }
})();
