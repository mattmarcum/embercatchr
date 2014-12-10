import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        playerEnded: function(){
            console.log( 'pod ended playing' );
        }
    },

    currentPercentage: function(){
        var duration = this.getWithDefault( 'duration', 0 ),
            position = this.getWithDefault( 'currentPosition', 0 );

        return ((position / duration) * 100).toFixed(2);

    }.property( 'duration', 'currentPosition' ),

    title: function(){
        return this.get( 'model.title' ) || 'No Pod Loaded';
    }.property( 'model.title' )
    
});
