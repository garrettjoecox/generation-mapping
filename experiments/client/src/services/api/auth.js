(() => {
  angular
    .module('skeleton')
    .factory('AuthAPI', AuthAPI);

  function AuthAPI(API, LS) {
    return {
      login,
      signup,
      isAuth,
      logout,
    };

    function login(data) {
      return API.post('/auth/login', data)
        .then(res => LS.set('jwt', res.token));
    }

    function signup(data) {
      return API.post('/auth/signup', data);
    }

    function isAuth() {
      return !!LS.get('jwt');
    }

    function logout() {
      return Promise.resolve()
        .then(() => LS.remove('jwt'));
    }
  }
})();
