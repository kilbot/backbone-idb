/* jshint -W074 */
module.exports = function(method, entity, options) {
  return entity.db.open()
    .then(function(){
      switch(method){
        case 'read':
          if(entity.id){
            return entity.db.read(entity, options);
          }
          return entity.db.getAll(options);
        case 'create':
          if (entity.id) {
            return entity.db.update(entity, options);
          }
          return entity.db.create(entity, options);
        case 'update':
          if (entity.id) {
            return entity.db.update(entity, options);
          }
          return entity.db.create(entity, options);
        case 'delete':
          if (entity.id) {
            return entity.db.destroy(entity, options);
          }
      }
    });
};
/* jshint +W074 */