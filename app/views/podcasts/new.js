import Ember from 'ember';

export default Ember.View.extend({
    urlInput: Ember.TextField.extend({
        becomeFocused: function() {
            this.$().focus();
        }.on('didInsertElement')
    })
});
