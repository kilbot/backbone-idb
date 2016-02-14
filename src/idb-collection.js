var bb = require('backbone');
var sync = require('./sync');
var IndexedDB = require('./src/promisify-idb-wrapper');
var IDBModel = require('./idb-model');

// attach to Backbone
bb.IDBCollection = bb.Collection.extend({

  model: IDBModel,

  initialize: function(models, options){
    this.db = new IndexedDB(options, this);
    this.db.open();
  },

  sync: sync,

  // ???
  merge: function(models){
    var self = this;
    return this.db.merge(models)
      .then(function(){
        var models = Array.prototype.slice.apply(arguments);
        return self.add(models, {merge: true});
      });
  }

});