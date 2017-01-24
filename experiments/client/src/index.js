(() => {
  angular
    .module('skeleton', [
      'ui.router',
    ])
    .config(Config)
    .factory('AttachTokens', AttachTokens)
    .run(SetupRouteAuth);

  function Config($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/loginV.html',
        controller: 'authC as authC',
        noAuth: true,
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/auth/signupV.html',
        controller: 'authC as authC',
        noAuth: true,
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home/homeV.html',
        controller: 'homeC as homeC',
      })
      .state('userCreate', {
        url: '/user/create',
        templateUrl: 'views/user/create/userCreateV.html',
        controller: 'userCreateC as userCreateC',
      })
      .state('userProfile', {
        url: '/user/:id',
        templateUrl: 'views/user/profile/userProfileV.html',
        controller: 'userProfileC as userProfileC',
        resolve: {
          user: function(UsersAPI, $stateParams) {
            return UsersAPI.getOne($stateParams.id);
          },
        },
      })
      .state('userEdit', {
        url: '/user/:id/edit',
        templateUrl: 'views/user/edit/userEditV.html',
        controller: 'userEditC as userEditC',
        resolve: {
          user: function(UsersAPI, $stateParams) {
            return UsersAPI.getOne($stateParams.id);
          },
        },
      });

    $httpProvider.interceptors.push('AttachTokens');
  }

  function AttachTokens($window) {
    return {
      request(payload) {
        const token = $window.localStorage.getItem('com.skeleton.jwt');
        if (token) payload.headers.Authorization = `JWT ${token}`;
        return payload;
      },
    };
  }

  function SetupRouteAuth($rootScope, $location, $state, AuthAPI) {
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', (event, to) => {
      if (to && !to.noAuth && !AuthAPI.isAuth()) {
        event.preventDefault();
        $state.go('login');
      }
    });
  }
})();
