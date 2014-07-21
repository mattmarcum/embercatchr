import Ember from 'ember';

export default Ember.ArrayController.extend({
    
    topLinks: Ember.A([
        { title: 'All', link: 'podcasts' },
        { title: 'New', link: 'podcasts.new' },
        { title: 'All Pods', link: 'pods' }
    ])

});
