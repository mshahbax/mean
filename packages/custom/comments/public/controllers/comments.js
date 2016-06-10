(function () {
  'use strict';

  /* jshint -W098 */

  function CommentsController($scope, Global, Comments, $stateParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'comments'
    };
    $scope.comments = [];
    $scope.comment = {
      articleId: $stateParams.id,
      comment: null
    }

    $scope.checkCircle = function () {
      Comments.checkCircle($stateParams.circle).then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });
    };

    $scope.getComments = function () {
      $scope.comments = [];
      Comments.getComments($stateParams.id).then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
        $scope.comments = response;
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });
    };

    $scope.createComment = function (comment) {
      Comments.createComment(comment).then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
        $scope.getComments();
        comment.comment = null;
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });
    };

  }

  angular
    .module('mean.comments')
    .controller('CommentsController', CommentsController);

  CommentsController.$inject = ['$scope', 'Global', 'Comments', '$stateParams'];

})();
