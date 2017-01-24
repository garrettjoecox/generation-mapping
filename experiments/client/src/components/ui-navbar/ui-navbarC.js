(() => {
  angular
    .module('skeleton')
    .directive('uiNavbar', uiNavbar)
    .controller('uiNavbarC', uiNavbarC);

  function uiNavbar() {
    return {
      templateUrl: 'components/ui-navbar/ui-navbarV.html',
    };
  }

  function uiNavbarC($state, AuthAPI) {
    this.logout = () => {
      AuthAPI.logout()
        .then(() => $state.go('login'));
    };
  }
})();
