import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        playNow: function( audioUrl ){
            this.controllerFor( 'player' ).setProperties({
                'model': this.modelFor( 'pod' ),
                'audioUrl': audioUrl
            });
        }
    },
    model: function( params ){
        return this.store.find( 'pod', params.pod_id );
    }
});
