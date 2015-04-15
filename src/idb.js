/**
 * Backbone adapter for idb-wrapper api
 */
var IDBStore = require('idb-wrapper');
var $ = require('jquery');
var _ = require('underscore');
var noop = function (){};
var defaultErrorHandler = function (error) {
  throw error;
};

function IndexedDB(options, parent) {
  this.parent = parent;
  this.options = options;
}

var methods = {

  /**
   *
   */
  open: function () {
    if(this._open){
      return this._open;
    }
    var deferred = new $.Deferred(),
        options = this.options || {};

    options.onStoreReady = deferred.resolve;
    options.onError = deferred.reject;

    this.store = new IDBStore(options);

    this._open = deferred.promise();
    return this._open;
  },

  /**
   * Add a new model to the store
   */
  create: function(model, options) {
    var deferred = new $.Deferred(),
      data = model.attributes,
      keyPath = this.store.keyPath;

    var onSuccess = function(insertedId){
      data[keyPath] = insertedId;
      options.success(data);
      deferred.resolve(data);
    };

    var onError = function(result){
      options.error(result);
      deferred.reject(result);
    };

    this.store.put(data, onSuccess, onError);

    return deferred.promise();
  },

  /**
   * Update a model in the store
   */
  update: function(model, options) {
    return this.put(model.attributes, options.success, options.error);
  },

  /**
   * Retrieve a model from the store
   */
  read: function(model, options) {
    return this.get(model.id, options.success, options.error);
  },

  /**
   * Delete a model from the store
   */
  destroy: function(model, options) {
    if (model.isNew()) {
      return false;
    }
    return this.remove(model.id, options.success, options.error);
  },

  /**
   *
   */
  put: function (key, value, success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.put(key, value, onSuccess, onError);

    return deferred.promise();
  },

  /**
   *
   */
  get: function (key, success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.get(key, onSuccess, onError);

    return deferred.promise();
  },

  /**
   *
   */
  remove: function (key, success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.remove(key, onSuccess, onError);

    return deferred.promise();
  },

  /**
   * Retrieve a collection from the store
   */
  getAll: function(success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.getAll(onSuccess, onError);

    return deferred.promise();
  },

  /**
   * Iterates over the store using the given options and calling onItem
   * for each entry matching the options.
   */
  iterate: function(options) {
    options = options || {};
    var deferred = new $.Deferred();
    options.onEnd = function (result) {
      deferred.resolve(result);
    };
    options.onError = function (err) {
      deferred.reject(err);
    };
    var onItem = function (item) {
      deferred.notify(item);
    };

    this.store.iterate(onItem, options);

    return deferred.promise();
  },

  /**
   * Creates a key range using specified options. This key range can be
   * handed over to the count() and iterate() methods.
   *
   * Note: You must provide at least one or both of "lower" or "upper" value.
   */
  makeKeyRange: function(options) {
    return this.store.makeKeyRange(options);
  },

  /**
   * Perform a batch operation to save all models in the current collection to
   * indexedDB.
   */
  saveAll: function(success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.putBatch(this.parent.toJSON(), onSuccess, onError);

    return deferred.promise();
  },

  /**
   * Perform a batch operation to save and/or remove models in the current
   * collection to indexedDB. This is a proxy to the idbstore `batch` method
   */
  batch: function(dataArray, success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.batch(dataArray, onSuccess, onError);

    return deferred.promise();
  },

  /**
   * Perform a batch put operation to save models to indexedDB. This is a
   * proxy to the idbstore `putBatch` method
   */
  putBatch: function(dataArray, success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.putBatch(dataArray, onSuccess, onError);

    return deferred.promise();
  },

  /**
   * Perform a batch operation to remove models from indexedDB. This is a
   * proxy to the idbstore `removeBatch` method
   */
  removeBatch: function(keyArray, success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.removeBatch(keyArray, onSuccess, onError);

    return deferred.promise();
  },

  /**
   * Clears all content from the current indexedDB for this collection/model
   */
  clear: function(success, error) {
    var deferred = new $.Deferred();
    success = success || noop;
    error = error || defaultErrorHandler;

    var onSuccess = function (result) {
      success.apply(this, arguments);
      deferred.resolve(result);
    };

    var onError = function (result) {
      error.apply(this, arguments);
      deferred.reject(result);
    };

    this.store.clear(onSuccess, onError);

    return deferred.promise();
  },

  /**
   * select records by {key: value}
   */
  getByAttribute: function(attribute){
    var deferred = new $.Deferred();
    var onSuccess = deferred.resolve;
    var onError = deferred.reject;

    var keyRange = this.store.makeKeyRange({
      only: _.chain(attribute).values().first().value()
    });

    this.store.query(onSuccess, {
      index: _.chain(attribute).keys().first().value(),
      keyRange: keyRange,
      onError: onError
    });

    return deferred.promise();
  }
};

_.extend(IndexedDB.prototype, methods);
module.exports = IndexedDB;