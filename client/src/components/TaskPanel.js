(function(ng){
  ng.module("Exam")
  .component("taskPanel",
  {
    templateUrl: '/src/components/TaskPanel.html',
    controller: 'taskPanelController',
    bindings: {
      taskType: "="
    }
  })
  .controller('taskPanelController', ['proxyApi', function(proxyApi){
        var vm = this;
    
        vm.$onInit = onInit;
    
        function onInit(){
          loadData()
        }
        function loadData(){
          proxyApi().getAllItems().then(function(res){
            vm.tasks = []
            for (var index = 0; index < res.length; index++) {
              var element = array[index];
              var dueDate = new Date(element.dueDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
              if (dueDate.getTime()>new Date().getTime() && vm.taskType == 'Overdue')
                vm.tasks.push(element);
              else
                vm.tasks.push(element);
            }
          })
        }
        function _delete(id){
          proxyApi().deleteItem(id).then(function(res){
            alert("Task deleted!")
          });
        }
        function edit(task){
          vm.selectedTask =  task
        }
  }])
})(angular);