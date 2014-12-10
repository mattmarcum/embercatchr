import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
    var fileNameRegex = /[\w_.-]*?(?=\?)|[\w_.-]*$/;
    return value.match( fileNameRegex )[0];
});
