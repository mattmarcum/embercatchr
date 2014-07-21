import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmbercatchrENV.locationType
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
