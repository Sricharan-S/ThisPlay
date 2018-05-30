var thisplay = angular.module('thisplay',['ngRoute']);
    thisplay.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/app', {
        templateUrl : 'views/app1.html',
        controller : 'appController',
    })
    .when('/', {
        templateUrl : 'views/login.html'
    })
    .when('/app/manage',{
        templateUrl :'views/app2.html',
        controller:'templateController'
    })
    .when('/app/display',{
      templateUrl:'views/display.html',
      controller:'displayController'
    })
    .otherwise({
        redirectTo : '/'
    })
    $locationProvider.hashPrefix('');
})

thisplay.factory('socketio', ['$rootScope',function ($rootScope) {
  var socket = io.connect("http://localhost:3000");
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}]);
