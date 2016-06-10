(function () {
  'use strict';

  /* jshint -W098 */

  function ArticlesController($scope, Global, Articles, $stateParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'articles'
    };
    $scope.post = {
      title: null,
      content: null,
    };
    $scope.posts = [];

    $scope.checkCircle = function () {
      Articles.checkCircle($stateParams.circle).then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });
    };

    $scope.createPost = function (post) {

      Articles.createPost(post).then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
        post.title = null;
        post.content = null;
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });

    };

    $scope.allPosts = function () {

      Articles.allPosts().then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
        $scope.posts = response;
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });

    };

    $scope.getPost = function () {
      
      Articles.getPost($stateParams.id).then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
        $scope.post = response;
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });

    };

  }

  angular
    .module('mean.articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', 'Global', 'Articles', '$stateParams'];

})();
