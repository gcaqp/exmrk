(function(ng)
{
  ng.module("Exam")
  .factory("proxyApi",['$http', function($http){
    var endpoint = "http://localhost:7777/"
    function proxyExam (){
        this.endpoint = endpoint; 
        this.deleteItem = function (id){
          return $http['delete'](this.endpoint + 'task/destroy/' + id);
        }
        this.updateItem = function (id, item){
          return $http['post'](this.endpoint + 'task/update' + id, item);
        }
        this.createItem = function (item){
          return $http['post'](this.endpoint + 'task/create?name=' + item.name + '&dueDate=' + item.dueDate + '&priority=' + item.priority);
        }
        this.getAllItems = function (){
          return $http['get'](this.endpoint + 'task');
        }
        return this;
    }
    
    return proxyExam;
  }])
})(angular)