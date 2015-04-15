describe('IndexedDB Collection', function () {

  it('should be in a valid state', function () {
    var collection = new Backbone.IDBCollection();
    collection.should.be.ok;
    collection.db.store.should.be.instanceOf(window.IDBStore);
  });

  describe('Working with a Backbone Model', function () {

    before(function () {
      this.collection = new Backbone.IDBCollection([
        {
          firstname: 'John',
          lastname: 'Doe',
          age: 52,
          email: 'johndoe@example.com'
        }
      ]);
    });

    it('should save/create a Backbone Model', function (done) {
      var model = this.collection.at(0);
      var onSuccess = function(m, resp){
        // note: returns all attributes w/ id on create
        m.should.eql(model);
        m.isNew().should.be.false;
        resp.should.have.property('firstname', 'John');
        done();
      };
      return model.save({}, {success: onSuccess});
    });

    it('should save/update an existing Backbone Model', function (done) {
      var model = this.collection.at(0);
      var onSuccess = function(m, resp){
        // note: returns only id on update
        resp.should.be.a('number');
        done();
      };
      model.save({age: 54}, {success: onSuccess});
    });

    it('should fetch/get an existing Backbone Model', function (done) {
      var model = this.collection.at(0);

      // change age in idb
      this.collection.db.store.put({ id: model.id, age: 53 });

      var onSuccess = function(m, resp){
        m.get('age').should.eql(53);
        done();
      };
      model.fetch({success: onSuccess});
    });

    it('should destroy/delete a model from the store', function (done) {
      var model = this.collection.at(0);
      var self = this;
      var onSuccess = function(m){
        m.should.eql(model);
        self.collection.db.store.count(function(count){
          count.should.eql(0);
          done();
        });
      };
      model.destroy({success: onSuccess});
    });

    after(function(done) {
      // deleteDatabase can cause problems, use clear instead
      this.collection.db.store.clear(done);
    });

  });

  describe('Working with a Backbone Collection', function () {

    before(function () {
      this.collection = new Backbone.IDBCollection();
    });

    it('should create a new Backbone Model', function (done) {
      var onSuccess = function(){
        done();
      };
      this.collection.create({
        firstname: 'Jane',
        lastname: 'Smith',
        age: 35,
        email: 'janesmith@example.com'
      }, { success: onSuccess });
    });

    after(function(done) {
      // deleteDatabase can cause problems, use clear instead
      this.collection.db.store.clear(done);
    });

  });

});