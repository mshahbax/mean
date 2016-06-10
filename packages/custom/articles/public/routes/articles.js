(function() {
    'use strict';

    function Articles($stateProvider) {
        $stateProvider.state('create-post', {
            url: '/articles/create',
            templateUrl: 'articles/views/create.html'
        }).state('posts', {
            url: '/articles',
            templateUrl: 'articles/views/posts.html'
        }).state('post', {
          url: '/articles/post/:id',
          templateUrl: 'articles/views/post.html'
        });
    }

    angular
        .module('mean.articles')
        .config(Articles);

    Articles.$inject = ['$stateProvider'];

})();
