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
            var self = this,
                podcast = self.modelFor( 'podcast' );
           
            podcast.get( 'pods' ).forEach( function( pod ){
                pod.get( 'audioUrls' ).invoke( 'destroyRecord' );
                pod.destroyRecord();
            });

            podcast.destroyRecord()
            .then( function(){
                self.transitionTo( 'podcasts' );
            });

        }
    }
});
