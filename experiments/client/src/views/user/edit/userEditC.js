(() => {
  angular
    .module('skeleton')
    .controller('userEditC', userEditC);

  function userEditC(user) {
    this.user = user;
    console.log(this.user);
  }
})();
