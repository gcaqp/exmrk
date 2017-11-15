module.exports =function(storageMemory){
  var _ = require('lodash');
  var moment = require('moment');

  function getData(){
    return storageMemory.get("data") || []
  }
  function setData(value){
    var data = storageMemory.get("data") 
    storageMemory.put("data", value);
  }
  function findId(id){
    return _.find(getData(), x=>x.id==id);
  }
  function vali (item, name, errors, fn, mesg, rule){
    
    fn = fn || function (){ return !item[name] };
    if (fn()){
      errors[name] = errors[name] || [] 
      errors[name].push({
        "data": null,
        "message":  mesg || "Validation error: \"null\" Rule \"required(true)\" failed.",
        "rule": rule || "required",
        "args": [
          true
          ]
        });
    }
  }
  function validations (item){
    var validationError = { }
    var errors = [{ValidationError:validationError}]
    vali(item, "name", errors);
    vali(item, "dueDate", errors, 
         function(){return !moment(item.dueDate, "YYYY-MM-DD").isValid()},
         "Validation error: \"null\" is not of type \"date\"", 
         "date");
    for (var key in validationError) {
      if (object.hasOwnProperty(key)) {
        return errors;
      }
    }
    return false;
    
  }
  function deleteItem(id){
    return setData(_.filter(getData(), x=> x.id != id)) ;
  }
  function updateItemData(id,item){
    var mitem = findId(id);
    mitem.name = item.name
    mitem.dueDate = item.dueDate
    mitem.priority = item.priority
    mitem.updatedAt = new Date();

    var result = validations(mitem)
    if (result !== false)
      return result;
    return mitem;
  }
  function addItemData(item){
    var d = getData();
    item.id = (_.maxBy(d, x=>x.id) || 0) + 1;
    item.createdAt = new Date()
    var result = validations(item)
    if (result !== false)
      d.push(item);
    else
      return validations;
    setData(d);
    return item;
  }

  return {
    addItemData: addItemData,
    updateItemData: updateItemData,
    deleteItem: deleteItem,
    getAll: getData
  }
}