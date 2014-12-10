import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('pods', function(){

  });
  this.resource('podcasts', function(){
      this.route('new');
  });
  this.resource('podcast', { path: 'podcasts/:podcast_id' }, function(){
    this.resource('pod', { path: 'pods/:pod_id' });
  });
});

export default Router;
