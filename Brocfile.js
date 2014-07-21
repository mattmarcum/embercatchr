/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import( 'vendor/ember-indexeddb-adapter/dist/ember_indexeddb_adapter.js' );

app.import( 'vendor/bootstrap/fonts/glyphicons-halflings-regular.woff' );

app.import( 'vendor/jFeed/build/dist/jquery.jfeed.js' );

module.exports = app.toTree();
