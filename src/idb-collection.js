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

    this.db = new IndexedDB(opts, this);
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


  // ???
  merge: function(models){
    var self = this;
    return this.db.merge(models)
      .then(function(){
        var models = Array.prototype.slice.apply(arguments);
        return self.add(models, {merge: true});
      });
  }

  //getChanged: function() {
  //  // return a list of models that have changed by checking hasChanged()
  //},
  //
  //save: function(attributes, options) {
  //  // get an array of changed models
  //}

});