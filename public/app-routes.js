angular.module('blocklapp-routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider){
        console.log('testing out routes');
        $routeProvider.when('/', {
            templateUrl: '/views/pages/home.html'
        })

        .when('/about', {
            templateUrl: '/views/pages/about.html'
        })

        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });
