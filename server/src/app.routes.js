exports.addRoutes = function (app, storage) {
  
  

  createTaskPOST = function(req, res){
    var task = {
      name : req.query.name,
      dueDate: req.query.dueDate,
      priority: req.query.priority
    }
    var result = storage.addItemData(task);
    if(result instanceof Array);
      res.status(500).json(result)  
    res.status(200).json(task)
  }

  getTasksGET = function(req, res){
    res.json(200, storage.getAll());
    res.end();
  }

  destroyTaskDELETE = function(req, res){
    var result = storage.deleteItem(req.param.id);
    res.json(200, result);
    res.end();
  }

  updateTaskPOST = function(req, res){
    var result = storage.updateItemData(req.body);
    if(result instanceof Array);
      res.json(500, result);
    res.json(200, task);
  }
  app.post  ('/task/create', createTaskPOST);
  app.get   ('/task', getTasksGET);
  app.delete('/task/destroy/:id', destroyTaskDELETE);
  app.post  ('/task/update', updateTaskPOST);
};