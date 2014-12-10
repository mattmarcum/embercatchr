/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import( 'ember-indexeddb-adapter/dist/ember_indexeddb_adapter.js' );

app.import( 'bootstrap/dist/js/bootstrap.js' );
app.import( 'bootstrap/fonts/glyphicons-halflings-regular.woff' );

app.import( 'jFeed/build/dist/jquery.jfeed.js' );

module.exports = app.toTree();
