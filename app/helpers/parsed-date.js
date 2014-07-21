import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
    var date = new Date( value );
    return date.toDateString();
});
