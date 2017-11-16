
(function(ng){
  ng.module("Exam")
  .component("taskEditor",
  {
    templateUrl: '/src/components/TaskEditor.html',
    controller: 'taskEditorController',
    bindings: {
      taskType: "=",
      taskItem: "=?",
      onSaved: "&"
    }
  })
  .controller('taskEditorController', ['proxyApi', '$filter','$scope', function(proxyApi, $filter, $scope){
        var vm = this;
    
        vm.$onInit = onInit;
    
        function onInit(){
          vm.save= Save;
          vm.New= New;
        }
        function New(){
          vm.taskItem = null;
        }
        function Save(){
          if($scope.frmTask.$invalid) alert("Invalid Inputs");

          if(!vm.taskItem || !vm.taskItem.id){
            proxyApi().createItem(vm.taskItem).then(function(res){
              alert("The task was created.");
              vm.onSaved()
            }, function(res){
              
            });
          }
          else{
            proxyApi().updateItem(vm.taskItem.id, item).then(function(res){
              alert("The task was updated.");
              vm.onSaved()
            }, function(res){

            });
          }
        }
  }])
})(angular);