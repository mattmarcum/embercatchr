import Ember from 'ember';

export default Ember.Route.extend({
    model: function( params ){
        return this.store.find( 'podcast', params.podcast_id );
    },
    actions:{
        updateFeed: function(){
            this.modelFor( 'podcast' ).updateFeed();
        },
        delete: function() {
            var self = this;

            self.modelFor( 'podcast' ).destroyRecord()
            .then( function(){
                self.transitionTo( 'podcasts' );
            }).catch( function( error ){
                self.send( 'addAlert', 'error', 'Failed to delete the podcast' );
                console.log('data error:', error );
            });

        }
    }
});
