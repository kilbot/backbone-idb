var bb = require('backbone');
var IndexedDB = require('./promisify-idb-wrapper');
var IDBModel = require('./idb-model');

// attach to Backbone
module.exports = bb.IDBCollection = bb.Collection.extend({

  model: IDBModel,

  constructor: function(){
    var opts = {
      storeName     : this.name,
      storePrefix   : this.storePrefix,
      dbVersion     : this.dbVersion,
      keyPath       : this.keyPath,
      autoIncrement : this.autoIncrement,
      indexes       : this.indexes
    };

    this.db = new IndexedDB(opts);
    this.db.open();

    bb.Collection.apply( this, arguments );
  },

  /**
   * Clears the IDB storage and resets the collection
   */
  clear: function(){
    var self = this;
    return this.db.open()
      .then(function(){
        return self.db.clear();
      })
      .done(function(){
        self.reset();
      });
  },

  save: function( models ){
    var self = this;
    if( ! models ){
      models = this.getChangedModels();
    }
    return this.db.open()
      .then( function() {
        return self.db.putBatch( models );
      })
      .then( function(){
        return self.fetch();
      });
  },

  getChangedModels: function(){
    return this.filter(function( model ){
      return model.isNew() || model.hasChanged();
    });
  }

});