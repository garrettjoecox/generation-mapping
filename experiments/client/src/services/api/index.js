(() => {
  angular
    .module('skeleton')
    .factory('API', API);

  function API($http) {
    const base = 'http://localhost:9000/api';

    return {
      request,
      get,
      post,
      put,
      remove,
    };

    function request(uri, config = {}) {
      return $http(Object.assign({
        method: 'GET',
        url: base + uri,
      }, config))
        .then(response => config.returnFull ? response : response.data);
    }

    function get(uri, config = {}) {
      return request(uri, Object.assign({
        method: 'GET',
      }, config));
    }

    function post(uri, data, config = {}) {
      return request(uri, Object.assign({
        method: 'POST',
        data,
      }, config));
    }

    function put(uri, data, config = {}) {
      return request(uri, Object.assign({
        method: 'PUT',
        data,
      }, config));
    }

    function remove(uri, config = {}) {
      return request(uri, Object.assign({
        method: 'DELETE',
      }, config));
    }
  }
})();
