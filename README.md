# Embercatchr
* ember new embercatcher
* cd embercatchr
now we can start up our revision control
* git init
lets install bootstrap
there is an ember-addon but it doesn't include the fonts yet
* bower install --save-dev bootstrap  
now we import bootstrap into our app
we could just import the css files and they'd get compiled into a vendor.css but this way we can override bootstrap variables
http:iamstef.net/ember-cli/#asset-compilation
//install the less compiler
* npm install --save-dev broccoli-less-single
* mv app/styles/app.css app/styles/app.less
* subl !$
* @import "/vendor/bootstrap/less/bootstrap.less";
* @icon-font-path: "bootstrap/fonts/";
now we import the fonts into the app
* subl Brocfile.js
* app.import( 'vendor/bootstrap/fonts/glyphicons-halflings-regular.woff' )
now lets add some simple bs markup and a play span and see if everything is working 
* subl app/styles/app.less
simple bootstrap styles for full screen app
* copy and past styles
full screen app with header & footer and side navbar
application.hbs is the top level template into which everything else gets rendered via the {{outlet}} tags
* subl app/templates/application.hbs
* copy and paste application markup
one last thing - lets generate an app view so we can specify our classes on the main application view
* ember g view application
* subl app/views/application.js
* classNames: ['container-fluid', 'main-container']
now load up ember serve and see what it looks like in the browser
* ember s
open the console and show off the ember inspector, available in the chrome store
click the toggle link and notice the error message - in dev mode ember gives you plenty of error messages
lets fix that, generate an application controller
* ember g controller application type:object
ember was automatically generating this controller before, but now we are going to manually configure it.
* subl app/controllers/application.js
You might think this is pretty dumb, but we've just learned templates, controllers, actions, and databound variables in one example

#Resources
We're going to create two models, a podcast and a pod, but first we've got to install the indexedDb adapter.  We can install it through bower like so:
* bower install git@github.com:mattmarcum/ember-indexeddb-adapter.git#master
I'm using my own fork of the indexedDb adapter until the maintainer fixes some bugs I submitted a pr for
Finish the installation by importing the adapter into the Brocfile.js
* app.import( 'vendor/ember-indexeddb-adapter/dist/ember_indexeddb_adapter.js' );
Now we can set up the adapter in out app.  
* ember g adapter application
* ember g serializer application
Now set the adapter and serializer to use the IndexedDb objects
For the adapter add the database name and 1st migration
Now that the db layer is setup lets add the two models:
* ember g resource podcasts
* ember g resource pods
This generates some models and their corresponding routes.  Notice that it updates the routes.js and it correctly gueses the real model name.
Now lets add lets add some attributes.  The hasMany and belongsTo set up the relationships between the two models
Now we're going to add a method on our podcast model call updateFeed. This method is going to take a url for an rss feed and 
retrieve it via google feeds and then parse it with a library.  Lets install the library first.
* bower install git@github.com:mattmarcum/jFeed.git#master
again we're using a fork of mine for an old library that hasn't been updated in awhile.  I've added some features to support podcasts and 
hopefully the author will update the library soon.
I'm going to copy and paste the updateFeed function now and briefly explain what's going on here.
This is the largest and most complex function on the app, and it is pretty much the heart and sould of the app
We need two helper functions to support this method also
That's it for models for now.  Now lets generate a route.

#Route
We're going to configure a couple of routes here.  `podcasts` is going to display a list of all the podcasts in the app.  
`podcast` is going to display a single podcast entry.
`podcasts/new` is going to allow us to add a podcast.
Lets get all of them wired up.

Ember has two different route types `resource` and `route`.  Resources can have nested paths which will come in handy in a moment.  
Lets configure our `podcasts` route.  First lets update the route to get an array of all the podcasts in the store.  And then lets
display them in our template.  We can create a helper to parse the date to get something a little nicer:
* ember g helper parsed-date  
Now lets make our `podcasts` and `podcasts/index` templates.

Lets generate our `podcasts/new` route, controller and view
* ember g route podcasts/new
* ember g controller podcasts/new
* ember g view podcasts/new
Lets clean up our router.js - ember-cli does a pretty good job of keeping it sane, but it can use a little help
And lets edit our template and view.  I want the input to autofocus when its inserted so we are going to extend the textfield component and add a function to
focus the element on insert
Now lets implement the save action on the controller, its pretty heavy also so lets step through it real quick

The last piece is our `podcast` resource.  Let's generate that and whip up a quick template:
* ember g resource podcast

That should be enough to at least some of the data.  Lets see what happens:
http://emberhotseat.com/feed/index.rss

Last thing lets add a `podcast` resource for displaying individual podcasts
* ember g resource podcast

That's pretty good but I'd like to see a list of the pods in the podcast too.  
Lets put the list of pods in the `podcast/index` template.
* ember g template podcast/index
Here I want to create some partials because I know we'll be using these more than once.  
We can just create these by hand since ember-cli doesn't have a generator for partials yet
* touch app/templates/pods/_header.hbs
* touch app/tempplates/pods/_row.hbs
And lets create another helper:
* ember g helper parsed-duration

Now lets add a nested resource under our `podcast` resource so we can see a single individual pod.
* ember g resource pod
and lets move it in the router.js under the podcast route with the correct param
Now lets configure the `pod` route with the correct model
And configure the pod template

Now we should be able to see the pods listed under our podcast
And we should be able to see our podcast listed under our podcasts route

Now lets add some navigation.

Lets add an application route to handle setting up our nav and eventually our player templates and controllers
* ember g route application

And lets go ahead and add our last couple of controllers and templates and views
* ember g controller nav type:array
* ember g template nav
* ember g controller player
* ember g template player
* ember g view player
* ember g template pods/index
* ember g controller pods/index type:array

Lets make sure the pods are sorted by date.

Now for the final, final piece - the Player!







