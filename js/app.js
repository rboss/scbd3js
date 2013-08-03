
app = angular.module("statistikdatabasen", ["services.breadcrumbs"]);

app.config(function($routeProvider, $httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $routeProvider.otherwise({
  });
});

app.factory('scbFactory', function($http) {
  return {
    getSubjectAreas: function(path) {
      var url = 'http://api.scb.se/OV0104/v1/doris/sv/ssd/' + path;
      console.log(url);
      return $http.get(url, { cache: true });
    }
  };
});

app.controller('mainCtrl', function($scope, $location, $rootScope, $routeParams, scbFactory, breadcrumbs){  
    
  $scope.subjects = [];

  refresh = function() {
    $scope.levels = breadcrumbs.getBreadcrumbs();
    scbFactory.getSubjectAreas($location.path()).success(function(data, status) {
      $scope.subjects = data;
    });
  };  

  $rootScope.$on('$routeChangeSuccess', refresh);

  refresh();

  $scope.subjectClick = function(subjectId, text) {
    console.log(subjectId);
    $location.path($location.path() + "/" + subjectId);
  };
});