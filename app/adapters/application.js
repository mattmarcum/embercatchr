import DS from 'ember-data';

export default DS.IndexedDBAdapter.extend({
    databaseName: 'firecatchr',
    version: 1,
    migrations: function() {
        this.addModel('podcast');
        this.addModel('pod');
    }
});
