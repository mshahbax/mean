(function() {
    'use strict';

    function Articles($stateProvider) {
        $stateProvider.state('create-post', {
            url: '/articles/create',
            templateUrl: 'articles/views/create.html'
        }).state('articles circles example', {
            url: '/articles/example/:circle',
            templateUrl: 'articles/views/example.html'
        });
    }

    angular
        .module('mean.articles')
        .config(Articles);

    Articles.$inject = ['$stateProvider'];

})();
