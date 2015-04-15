var bb = require('backbone');
var idbSync = require('./src/sync.js');
var IndexedDB = require('./src/idb.js');

// reference to Backbone.sync
bb.ajaxSync = bb.sync;

// override Backbone.sync
bb.sync = function(method, entity, options) {
  if(entity.db || (entity.collection && entity.collection.db)){
    return idbSync.apply(this, [method, entity, options]);
  }
  return bb.ajaxSync.apply(this, [method, entity, options]);
};

// attach to Backbone
bb.IDBCollection = bb.Collection.extend({
  initialize: function(models, options){
    this.db = new IndexedDB(options, this);
    this.db.open();
  }
});