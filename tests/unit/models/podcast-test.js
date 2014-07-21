import { test, moduleForModel } from 'ember-qunit';

moduleForModel('podcast', 'Podcast', {
  // Specify the other units that are required for this test.
  needs: [ 'model:pod' ]
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
