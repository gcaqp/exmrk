(function(ng){
  ng.module("Exam")
  .component("taskTypeContainer",
  {
    templateUrl: '/src/components/TaskTypeContainer.html',
    controller: 'taskTypeContainerController',
    bindings: {
      taskType: "=",
      onRefresh:"=?"
    }
  })
  .controller('taskTypeContainerController', ['proxyApi', function(proxyApi){
    
    var vm = this;

    vm.$onInit = onInit;
    
    function onInit(){

    }

  }])
})(angular);