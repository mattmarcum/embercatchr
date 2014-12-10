import DS from 'ember-data';

export default DS.IndexedDBAdapter.extend({
    databaseName: 'firecatchr',
    version: 4,
    migrations: function() {
        this.addModel('podcast');
        this.addModel('pod');
        this.addModel('audio-url');
    }
});
