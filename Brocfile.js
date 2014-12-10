/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import( app.bowerDirectory +'/ember-indexeddb-adapter/dist/ember_indexeddb_adapter.js' );

app.import( app.bowerDirectory +'/bootstrap/dist/js/bootstrap.js' );
app.import( app.bowerDirectory +'/bootstrap/fonts/glyphicons-halflings-regular.woff' );

app.import( app.bowerDirectory +'/jFeed/build/dist/jquery.jfeed.js' );

module.exports = app.toTree();
