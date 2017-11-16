
(function(ng)
{
  ng.module("Exam",[])
  .controller("mainController",['$scope', function($scope){
    $scope.saved = function(){
      $scope.refreshP();
      $scope.refreshO();
    }
  }])
})(angular)