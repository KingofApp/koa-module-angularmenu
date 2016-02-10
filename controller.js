'use strict';

angular
  .controller('Menu1Ctrl', Menu1Ctrl);

Menu1Ctrl.$inject = ['$scope','$rootScope', '$location', 'structureService'];

function Menu1Ctrl($scope, $rootScope, $location, structureService) {
  //Register upper level modules
  structureService.registerModule($location,$scope,"angularmenu");

  $scope.leftVisible = false;
  $scope.menu        = getMenu();
  $scope.showLeft    = showLeftFn;
  $scope.close       = closeFn;

  function showLeftFn(e) {
    $scope.leftVisible = true;
    e.stopPropagation();
  }

  function closeFn() {
    $scope.leftVisible = false;
  }

  function getMenu() {
    var menu = new Array(0);
    var trExp = /[\/\s]+/gi;
    angular.forEach(structureService.getChildren($scope.angularmenu.modulescope.path), function(value, key) {
      structureService.getModule(key).then(function(module) {
        if (module.showOn && module.showOn.menu) {
          var slug = value.name.replace(trExp, '-');
          menu.push({
            text: value.name,
            icon: getIcon(value.icon),
            url: '#' + key,
            class: slug
          });
        }
      });
    });
    return menu;
  }
  function getIcon(icon) {
    if($scope.angularmenu.modulescope.showicons){
      return icon;
    }
    return "";
  }
  $rootScope.$on("documentClicked", function _close() {
      $scope.$apply(function() {
          $scope.close();
      });
  });
}
