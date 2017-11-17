
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
              if(ng.isArray(res.data) && 
                res.data.length>0){
                  var validationsErrors = res.data[0].ValidationError;
                  var builder = ''
                  for (var key in validationsErrors) {
                    if (validationsErrors.hasOwnProperty(key)) {
                      var element = validationsErrors[key];
                      builder += key + ": \n";
                      for (var index = 0; index < element.length; index++) {
                        var element1 = element[index];
                        builder += element1.message + "\n";  
                      }
                    }
                  }
                  alert(builder)
              }
              else{
                alert("an error has occurred");
              }
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