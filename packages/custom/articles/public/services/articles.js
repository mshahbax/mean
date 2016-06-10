(function () {
  'use strict';

  function Articles($http, $q) {
    return {
      name: 'articles',
      checkCircle: function (circle) {
        var deferred = $q.defer();

        $http.get('/api/articles/example/' + circle).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;

      },
      createPost: function (post) {
        var deferred = $q.defer();

        $http.post('/api/articles/create/', post).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;

      },
    };
  }

  angular
    .module('mean.articles')
    .factory('Articles', Articles);

  Articles.$inject = ['$http', '$q'];

})();
