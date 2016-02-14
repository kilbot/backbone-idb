/* jshint -W074 */
module.exports = function(method, entity, options) {
  var db = entity.db || entity.collection.db;

  return db.open()
    .then(function(){
      switch(method){
        case 'read':
          if(entity.id){
            return db.read(entity, options);
          }
          return db.getAll(options);
        case 'create':
          if (entity.id) {
            return db.update(entity, options);
          }
          return db.create(entity, options);
        case 'update':
          if (entity.id) {
            return db.update(entity, options);
          }
          return db.create(entity, options);
        case 'delete':
          if (entity.id) {
            return db.destroy(entity, options);
          }
      }
    });
};
/* jshint +W074 */