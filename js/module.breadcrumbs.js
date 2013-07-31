var breadcrumbs = angular.module('services.breadcrumbs', []);

breadcrumbs.factory('breadcrumbs', function($location) {
  return {
    getBreadcrumbs: function() {
      var currentPath = "";

      return _.chain($location.path().split("/"))
       .filter(function(item) { return item.length > 0})
       .map(function(item) {
          currentPath = currentPath + item + "/";
          return { text: item, link: currentPath };
      }).value();
    }
  };
});