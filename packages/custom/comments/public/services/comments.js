(function () {
  'use strict';

  function Comments($http, $q) {
    return {
      name: 'comments',
      checkCircle: function (circle) {
        var deferred = $q.defer();

        $http.get('/api/comments/example/' + circle).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;

      },
      getComments: function (articleId) {
        var deferred = $q.defer();

        $http.get('/api/comments/all/' + articleId).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;

      },
      createComment: function (comment) {
        var deferred = $q.defer();

        $http.post('/api/comments/create/', comment).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;

      }
    };
  }

  angular
    .module('mean.comments')
    .factory('Comments', Comments);

  Comments.$inject = ['$http', '$q'];

})();
