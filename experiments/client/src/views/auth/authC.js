(() => {
  angular
    .module('skeleton')
    .controller('authC', authC);

  function authC($state, AuthAPI) {
    this.login = (form) => {
      AuthAPI.login(form)
        .then(() => $state.go('home'))
        .catch((e) => {
        });
    };

    this.signup = (form) => {
      AuthAPI.signup(form)
        .then(() => this.login(form))
        .catch((e) => {
        });
    };
  }
})();
