
(function(ng){
  ng.module("Exam")
  .component("taskPanel",
  {
    templateUrl: '/src/components/TaskPanel.html',
    controller: 'taskPanelController',
    bindings: {
      taskType: "=",
      onRefresh:"=?"
    }
  })
  .controller('taskPanelController', ['proxyApi', '$scope', '$timeout', function(proxyApi, $scope, $timeout){
        var vm = this;
    
        vm.$onInit = onInit;
    
        function onInit(){
          loadData()
          vm.orderBy = orderBy
        }
        function toDate(value){
          return new Date(value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
          
        }
        $timeout(function(){ 
          vm.onRefresh = function(){
            loadData();
          } 
        });
        
        
        function loadData(){
          proxyApi().getAllItems().then(function(res){
            
            vm.tasks = []
            for (var index = 0; index < res.data.length; index++) {
              var element = res.data[index];
              var dueDate = toDate(element.dueDate)
              var isOverdue = dueDate.getTime()>new Date().getTime()
              if (isOverdue && vm.taskType == 'Overdue')
                vm.tasks.push(element);
              else if (vm.taskType == 'Pending' && !isOverdue)
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
        var isDesc = false;
        function orderBy(name){
          vm.tasks.sort(function(a,b)
          { 
            var v1 = a, v2=b
            if(isDesc){ v1=b;v2=a; }
           if (name == 'dueDate')
              return toDate(v1[name]).getTime() > toDate(v2[name]).getTime() ? 1 : -1;
            return v1[name].localeCompare(v2[name]);
          });
          isDesc = !isDesc 
          $timeout(function(){ $scope.$apply(); });
          
        }
  }])
})(angular);