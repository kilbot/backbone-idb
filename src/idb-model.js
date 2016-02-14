var bb = require('backbone');
var sync = require('./sync');

// attach to Backbone
bb.IDBModel = bb.Model.extend({

  initialize: function(){
    if( !this.collection || !this.collection.db ){
      throw Error('Model must be in an IDBCollection');
    }
  },

  sync: sync

});