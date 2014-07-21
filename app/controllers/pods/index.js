import Ember from 'ember';

export default Ember.ArrayController.extend({
    sortProperties: ['pubDate'],
    sortAscending: false
});
